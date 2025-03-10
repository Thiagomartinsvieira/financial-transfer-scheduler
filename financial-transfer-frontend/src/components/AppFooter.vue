<template>
  <footer class="bg-primary-dark text-white py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p class="text-sm">
            &copy; {{ currentYear }} Financial Transfer System. All rights reserved.
          </p>
        </div>
        <div class="flex space-x-4">
          <a href="#" class="text-sm text-blue-200 hover:text-white">Terms of Service</a>
          <a href="#" class="text-sm text-blue-200 hover:text-white">Privacy Policy</a>
          <a href="#" class="text-sm text-blue-200 hover:text-white">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
