<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppHeader />
    <main class="flex-1 container mx-auto py-8 px-4">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>
