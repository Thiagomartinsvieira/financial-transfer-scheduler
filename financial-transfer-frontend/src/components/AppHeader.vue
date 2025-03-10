<template>
  <header class="w-full h-20 bg-primary text-white shadow-md flex items-center px-6 sticky top-0 z-10">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        <h1 class="text-2xl font-bold">{{ title }}</h1>
      </div>
      <div class="flex items-center space-x-4">
        <nav class="hidden md:flex space-x-6">
          <router-link to="/" class="hover:text-blue-200 transition-colors">Dashboard</router-link>
          <router-link to="/schedule" class="hover:text-blue-200 transition-colors">Schedule Transfer</router-link>
          <router-link to="/history" class="hover:text-blue-200 transition-colors">Transfer History</router-link>
          <a href="#" class="hover:text-blue-200 transition-colors">Help</a>
        </nav>
        <div class="flex items-center space-x-2 border-l pl-4 border-blue-700">
          <div class="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span class="text-sm font-medium">JD</span>
          </div>
          <span class="hidden md:inline">John Doe</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Financial Transfer System')
</script>
