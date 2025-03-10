<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-center mb-4">
          <template v-if="status === 'pending'">Confirm Transfer</template>
          <template v-else-if="status === 'success'">Transfer Scheduled Successfully</template>
          <template v-else-if="status === 'error'">Transfer Error</template>
        </h2>

        <!-- Pending Status Content -->
        <template v-if="status === 'pending'">
          <p class="text-center text-gray-600 mb-4">
            Please review the transfer details before confirming:
          </p>

          <div class="space-y-4 bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">From Account:</span>
              <span class="font-medium">{{ transferDetails.originAccount }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">To Account:</span>
              <span class="font-medium">{{ transferDetails.destinationAccount }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Amount:</span>
              <span class="font-medium">{{ formatCurrency(transferDetails.amount) }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Fee:</span>
              <span class="font-medium">{{ formatCurrency(transferDetails.fee) }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total:</span>
              <span class="font-bold">{{ formatCurrency(transferDetails.amount + transferDetails.fee) }}</span>
            </div>

            <div class="flex justify-between items-center">
              <span class="text-gray-600">Transfer Date:</span>
              <span class="font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(transferDetails.transferDate) }}
              </span>
            </div>
          </div>
        </template>

        <!-- Success Status Content -->
        <template v-else-if="status === 'success'">
          <div class="text-center space-y-4 mb-6">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-gray-600">
              Your transfer of {{ formatCurrency(transferDetails.amount) }} from account {{ transferDetails.originAccount }} to {{ transferDetails.destinationAccount }} has been scheduled for {{ formatDate(transferDetails.transferDate) }}.
            </p>
            <div class="bg-green-50 p-3 rounded-md text-green-800 text-sm">
              A confirmation has been sent to your registered email address.
            </div>
          </div>
        </template>

        <!-- Error Status Content -->
        <template v-else-if="status === 'error'">
          <div class="text-center space-y-4 mb-6">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-gray-600">
              We encountered an error while processing your transfer request. Please try again or contact customer support.
            </p>
            <div class="bg-red-50 p-3 rounded-md text-red-800 text-sm">
              Error code: TRANSFER_PROCESSING_FAILED
            </div>
          </div>
        </template>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <template v-if="status === 'pending'">
            <button 
              @click="handleCancel" 
              class="flex-1 btn btn-outline"
              :disabled="isProcessing"
            >
              Cancel
            </button>
            <button 
              @click="handleConfirm" 
              class="flex-1 btn btn-primary"
              :disabled="isProcessing"
            >
              {{ isProcessing ? 'Processing...' : 'Confirm Transfer' }}
            </button>
          </template>

          <template v-else-if="status === 'success'">
            <button @click="handleCancel" class="flex-1 btn btn-outline">Close</button>
            <button @click="handleConfirm" class="flex-1 btn btn-primary flex items-center justify-center">
              View Transfer History
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </template>

          <template v-else-if="status === 'error'">
            <button @click="handleCancel" class="flex-1 btn btn-outline">Cancel</button>
            <button @click="handleConfirm" class="flex-1 btn btn-primary">Try Again</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { format, parseISO } from 'date-fns'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  transferDetails: {
    type: Object,
    default: () => ({
      originAccount: '1234567890',
      destinationAccount: '0987654321',
      amount: 1000,
      fee: 10,
      transferDate: new Date(Date.now() + 86400000) // Tomorrow
    })
  },
  status: {
    type: String,
    default: 'pending',
    validator: (value) => ['pending', 'success', 'error'].includes(value)
  }
})

const emit = defineEmits(['update:open', 'confirm', 'cancel'])

const isOpen = ref(props.open)
const isProcessing = ref(false)

watch(() => props.open, (newVal) => {
  isOpen.value = newVal
})

const handleConfirm = () => {
  if (props.status === 'pending') {
    isProcessing.value = true
    // Simulate processing delay
    setTimeout(() => {
      isProcessing.value = false
      emit('confirm')
    }, 1500)
  } else {
    emit('confirm')
  }
}

const handleCancel = () => {
  emit('update:open', false)
  emit('cancel')
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (date) => {
  if (typeof date === 'string') {
    try {
      return format(parseISO(date), 'MMMM dd, yyyy')
    } catch (e) {
      return date
    }
  }
  return format(date, 'MMMM dd, yyyy')
}
</script>
