<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-primary mb-6">Schedule New Transfer</h1>
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Origin Account -->
          <div>
            <label for="originAccount" class="form-label">Origin Account</label>
            <input
              id="originAccount"
              v-model="form.originAccount"
              type="text"
              placeholder="Enter 10-digit account number"
              class="form-input"
              :class="{ 'border-red-500': errors.originAccount }"
            />
            <p v-if="errors.originAccount" class="mt-1 text-sm text-red-600">{{ errors.originAccount }}</p>
          </div>

          <!-- Destination Account -->
          <div>
            <label for="destinationAccount" class="form-label">Destination Account</label>
            <input
              id="destinationAccount"
              v-model="form.destinationAccount"
              type="text"
              placeholder="Enter 10-digit account number"
              class="form-input"
              :class="{ 'border-red-500': errors.destinationAccount }"
            />
            <p v-if="errors.destinationAccount" class="mt-1 text-sm text-red-600">{{ errors.destinationAccount }}</p>
          </div>

          <!-- Amount -->
          <div>
            <label for="amount" class="form-label">Transfer Amount ($)</label>
            <input
              id="amount"
              v-model="form.amount"
              type="text"
              placeholder="Enter amount"
              class="form-input"
              :class="{ 'border-red-500': errors.amount }"
              @input="calculateFee"
            />
            <p v-if="errors.amount" class="mt-1 text-sm text-red-600">{{ errors.amount }}</p>
          </div>

          <!-- Transfer Date -->
          <div>
            <label for="transferDate" class="form-label">Transfer Date</label>
            <input
              id="transferDate"
              v-model="form.transferDate"
              type="date"
              class="form-input"
              :class="{ 'border-red-500': errors.transferDate }"
              :min="minDate"
              @change="calculateFee"
            />
            <p v-if="errors.transferDate" class="mt-1 text-sm text-red-600">{{ errors.transferDate }}</p>
          </div>
        </div>

        <!-- Fee Display -->
        <div class="bg-gray-50 p-4 rounded-md">
          <div class="flex justify-between items-center">
            <span class="font-medium">Transfer Fee:</span>
            <span class="text-lg font-bold">
              {{ fee !== null ? `$${fee.toFixed(2)}` : "Calculating..." }}
            </span>
          </div>
        </div>

        <!-- Fee Alert -->
        <div v-if="showFeeAlert" class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">
                No applicable fee exists for this transfer date and amount combination. Please select a different date.
              </p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full btn btn-primary py-3"
          :disabled="showFeeAlert || isSubmitting"
        >
          {{ isSubmitting ? 'Processing...' : 'Schedule Transfer' }}
        </button>
      </form>

      <!-- Success Modal -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full">
          <h3 class="text-xl font-bold text-green-600 mb-4 text-center">Transfer Scheduled Successfully!</h3>
          <p class="mb-6 text-center">Your transfer has been scheduled. You can view it in your transfer history.</p>
          <div class="flex justify-center">
            <button @click="showSuccess = false" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'

const form = ref({
  originAccount: '',
  destinationAccount: '',
  amount: '',
  transferDate: format(new Date(), 'yyyy-MM-dd')
})

const errors = ref({})
const fee = ref(null)
const showFeeAlert = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)

const minDate = computed(() => {
  return format(new Date(), 'yyyy-MM-dd')
})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.originAccount) {
    errors.value.originAccount = 'Origin account is required'
    isValid = false
  } else if (!/^\d{10}$/.test(form.value.originAccount)) {
    errors.value.originAccount = 'Origin account must be exactly 10 digits'
    isValid = false
  }

  if (!form.value.destinationAccount) {
    errors.value.destinationAccount = 'Destination account is required'
    isValid = false
  } else if (!/^\d{10}$/.test(form.value.destinationAccount)) {
    errors.value.destinationAccount = 'Destination account must be exactly 10 digits'
    isValid = false
  }

  if (!form.value.amount) {
    errors.value.amount = 'Amount is required'
    isValid = false
  } else if (isNaN(Number(form.value.amount)) || Number(form.value.amount) <= 0) {
    errors.value.amount = 'Amount must be a positive number'
    isValid = false
  }

  if (!form.value.transferDate) {
    errors.value.transferDate = 'Transfer date is required'
    isValid = false
  }

  return isValid
}

const calculateFee = async () => {
  if (!form.value.amount || isNaN(Number(form.value.amount)) || !form.value.transferDate) {
    fee.value = null
    return
  }

  try {
    const response = await axios.get('/api/transfers/calculate-fee', {
      params: {
        amount: Number(form.value.amount),
        date: form.value.transferDate
      }
    })
    fee.value = response.data
    showFeeAlert.value = false
  } catch (error) {
    console.error('Error calculating fee:', error)
    fee.value = null
    showFeeAlert.value = true
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  if (fee.value === null) {
    showFeeAlert.value = true
    return
  }

  isSubmitting.value = true

  try {
    await axios.post('/api/transfers', {
      originAccount: form.value.originAccount,
      destinationAccount: form.value.destinationAccount,
      amount: Number(form.value.amount),
      transferDate: form.value.transferDate
    })

    // Reset form
    form.value = {
      originAccount: '',
      destinationAccount: '',
      amount: '',
      transferDate: format(new Date(), 'yyyy-MM-dd')
    }
    fee.value = null
    showSuccess.value = true
  } catch (error) {
    console.error('Error scheduling transfer:', error)
    if (error.response && error.response.data) {
      errors.value = error.response.data
    }
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  calculateFee()
})
</script>
