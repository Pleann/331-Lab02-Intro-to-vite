<script setup lang="ts">
import { toRefs } from 'vue'
import type { Event } from '@/type'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
const props = defineProps<{
  event: Event
  id: string
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
  router.push({ name: 'event-detail-view' })
  store.updateMessage('You are successfully registered for ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template class="flex flex-col items-center gap-4 py-4">
  <p class="text-lg font-medium text-gray-700">Register event here</p>
  <button @click="register" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700 transition">Register</button>
</template>
