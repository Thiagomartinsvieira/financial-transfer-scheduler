<template>
  <div>
    <div class="card mb-6">
      <h2 class="text-2xl font-bold text-primary mb-2">Welcome to Financial Transfer System</h2>
      <p class="text-gray-600">
        Easily schedule transfers between accounts and manage your financial transactions. 
        Use the tabs below to schedule a new transfer or view your transfer history.
      </p>
    </div>

    <div class="my-6">
      <TransferTabs :default-tab="defaultTab" @tab-change="handleTabChange" />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="card">
        <h3 class="text-lg font-semibold text-primary mb-3">Quick Tips</h3>
        <ul class="space-y-2 text-gray-600">
          <li class="flex items-start">
            <span class="bg-blue-100 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">1</span>
            <span>Enter 10-digit account numbers for both origin and destination</span>
          </li>
          <li class="flex items-start">
            <span class="bg-blue-100 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">2</span>
            <span>Transfer fees are calculated based on the selected date</span>
          </li>
          <li class="flex items-start">
            <span class="bg-blue-100 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">3</span>
            <span>Weekend transfers over $1,000 are not supported</span>
          </li>
        </ul>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-primary mb-3">Recent Activity</h3>
        <div class="space-y-3">
          <div class="border-b pb-2">
            <p class="text-sm text-gray-500">Today</p>
            <p class="font-medium">Transfer to account 0987654321</p>
            <p class="text-sm text-gray-600">$750.00</p>
          </div>
          <div class="border-b pb-2">
            <p class="text-sm text-gray-500">Yesterday</p>
            <p class="font-medium">Transfer to account 1234567890</p>
            <p class="text-sm text-gray-600">$1,200.00</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">June 15, 2023</p>
            <p class="font-medium">Transfer to account 5678901234</p>
            <p class="text-sm text-gray-600">$500.00</p>
          </div>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-primary mb-3">Need Help?</h3>
        <p class="text-gray-600 mb-4">
          If you have any questions or need assistance with your transfers, our support team is here to help.
        </p>
        <div class="space-y-2">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <span class="text-gray-700">(800) 123-4567</span>
          </div>
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <span class="text-gray-700">support@financialtransfer.com</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TransferTabs from '../components/TransferTabs.vue'

const router = useRouter()
const defaultTab = ref('schedule')

const handleTabChange = (tab) => {
  if (tab === 'schedule') {
    router.push('/schedule')
  } else if (tab === 'history') {
    router.push('/history')
  }
}
</script>
