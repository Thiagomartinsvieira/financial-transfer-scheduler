<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="border-b px-6 py-4 bg-gray-50">
      <div class="grid w-full max-w-md grid-cols-2 bg-gray-100 rounded-md p-1">
        <button 
          @click="setActiveTab('schedule')"
          :class="['py-2 px-4 rounded-md transition-colors', 
                  activeTab === 'schedule' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200']"
        >
          Schedule Transfer
        </button>
        <button 
          @click="setActiveTab('history')"
          :class="['py-2 px-4 rounded-md transition-colors', 
                  activeTab === 'history' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200']"
        >
          Transfer History
        </button>
      </div>
    </div>

    <div class="p-6">
      <div v-if="activeTab === 'schedule'">
        <slot name="schedule">
          <p class="text-center text-gray-500 py-4">Schedule content will be displayed here</p>
        </slot>
      </div>
      <div v-else-if="activeTab === 'history'">
        <slot name="history">
          <p class="text-center text-gray-500 py-4">History content will be displayed here</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  defaultTab: {
    type: String,
    default: 'schedule'
  }
})

const emit = defineEmits(['tab-change'])

const activeTab = ref(props.defaultTab)

const setActiveTab = (tab) => {
  activeTab.value = tab
  emit('tab-change', tab)
}

onMounted(() => {
  activeTab.value = props.defaultTab
})

watch(() => props.defaultTab, (newVal) => {
  activeTab.value = newVal
})
</script>
