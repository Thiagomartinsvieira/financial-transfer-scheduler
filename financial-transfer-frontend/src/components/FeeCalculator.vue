<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h3 class="text-lg font-medium text-primary">Fee Calculator</h3>
    </div>
    
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Transfer Amount:</span>
        <span class="font-medium">${{ amount.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Transfer Date:</span>
        <span class="font-medium">{{ formatDate(date) }}</span>
      </div>

      <div class="flex justify-between items-center pt-2 border-t border-gray-200">
        <span class="text-sm font-semibold">Calculated Fee:</span>
        <span class="text-lg font-bold text-primary">
          {{ calculatedFee !== null ? `$${calculatedFee.toFixed(2)}` : "Not Available" }}
        </span>
      </div>

      <div v-if="calculatedFee === null" class="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded-md">
        No applicable fee exists for this transfer date and amount combination.
      </div>

      <div class="mt-2 p-2 bg-blue-50 text-blue-700 text-xs rounded-md">
        <p class="font-medium mb-1">Fee Calculation Rules:</p>
        <ul class="list-disc list-inside space-y-1">
          <li>Base fee: 1% of transfer amount</li>
          <li>Weekend surcharge: $5.00</li>
          <li>Minimum fee: $2.00</li>
          <li>Weekend transfers over $1,000 are not supported</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'

const props = defineProps({
  amount: {
    type: Number,
    default: 500
  },
  date: {
    type: Date,
    default: () => new Date()
  }
})

const emit = defineEmits(['fee-calculated'])

const calculatedFee = ref(null)

const calculateFee = async () => {
  try {
    const response = await axios.get('/api/transfers/calculate-fee', {
      params: {
        amount: props.amount,
        date: format(props.date, 'yyyy-MM-dd')
      }
    })
    calculatedFee.value = response.data
    emit('fee-calculated', calculatedFee.value)
  } catch (error) {
    console.error('Error calculating fee:', error)
    calculatedFee.value = null
    emit('fee-calculated', null)
  }
}

const formatDate = (date) => {
  return format(date, 'MMM dd, yyyy')
}

watch(() => [props.amount, props.date], () => {
  calculateFee()
}, { deep: true })

onMounted(() => {
  calculateFee()
})
</script>
