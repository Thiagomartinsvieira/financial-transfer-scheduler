<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-primary mb-6">Transfer History</h1>
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="relative flex-1">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search by account or amount"
              class="form-input pl-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select v-model="statusFilter" class="form-input w-full md:w-48">
            <option value="all">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th @click="sortBy('originAccount')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Origin Account
                <SortIcon :active="sortKey === 'originAccount'" :direction="sortDirection" />
              </th>
              <th @click="sortBy('destinationAccount')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Destination Account
                <SortIcon :active="sortKey === 'destinationAccount'" :direction="sortDirection" />
              </th>
              <th @click="sortBy('amount')" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Amount
                <SortIcon :active="sortKey === 'amount'" :direction="sortDirection" />
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fee
              </th>
              <th @click="sortBy('transferDate')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Transfer Date
                <SortIcon :active="sortKey === 'transferDate'" :direction="sortDirection" />
              </th>
              <th @click="sortBy('scheduledDate')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Scheduled On
                <SortIcon :active="sortKey === 'scheduledDate'" :direction="sortDirection" />
              </th>
              <th @click="sortBy('status')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Status
                <SortIcon :active="sortKey === 'status'" :direction="sortDirection" />
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="isLoading">
              <td colspan="7" class="px-6 py-10 text-center text-gray-500">
                Loading transfers...
              </td>
            </tr>
            <tr v-else-if="filteredTransfers.length === 0">
              <td colspan="7" class="px-6 py-10 text-center text-gray-500">
                No transfers found matching your criteria
              </td>
            </tr>
            <tr v-for="transfer in filteredTransfers" :key="transfer.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                {{ transfer.originAccount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {{ transfer.destinationAccount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-gray-900">
                {{ formatCurrency(transfer.amount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                {{ formatCurrency(transfer.fee) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(transfer.transferDate) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {{ formatDate(transfer.scheduledDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(transfer.status)">
                  {{ transfer.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 flex justify-end space-x-3">
        <button class="btn btn-outline">
          Export
        </button>
        <button @click="$router.push('/schedule')" class="btn btn-primary">
          Schedule New Transfer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { format, parseISO } from 'date-fns'
import axios from 'axios'

const transfers = ref([])
const isLoading = ref(true)
const searchTerm = ref('')
const statusFilter = ref('all')
const sortKey = ref('scheduledDate')
const sortDirection = ref('desc')

const SortIcon = (props) => {
  return (
    <span class="inline-block ml-1">
      {props.active ? (
        props.direction === 'asc' ? (
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        )
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )}
    </span>
  )
}

const filteredTransfers = computed(() => {
  let result = [...transfers.value]

  // Filter by search term
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase()
    result = result.filter(transfer => 
      transfer.originAccount.includes(term) ||
      transfer.destinationAccount.includes(term) ||
      transfer.amount.toString().includes(term)
    )
  }

  // Filter by status
  if (statusFilter.value !== 'all') {
    result = result.filter(transfer => transfer.status === statusFilter.value)
  }

  // Sort
  result.sort((a, b) => {
    let aValue = a[sortKey.value]
    let bValue = b[sortKey.value]

    // Handle dates
    if (sortKey.value === 'transferDate' || sortKey.value === 'scheduledDate') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return result
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString) => {
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy')
  } catch (e) {
    return dateString
  }
}

const getStatusBadgeClass = (status) => {
  const baseClasses = 'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full'
  
  switch (status) {
    case 'COMPLETED':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'PENDING':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'CANCELLED':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

const fetchTransfers = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('/api/transfers')
    transfers.value = response.data
  } catch (error) {
    console.error('Error fetching transfers:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTransfers()
})
</script>
