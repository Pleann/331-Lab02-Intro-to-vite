<script setup lang="ts">
import { toRefs } from 'vue'
import type { Event } from '@/type'
import { useMessageStore } from '@/stores/message'
import { useRouter } from 'vue-router'
const props = defineProps<{
  event: Event
  id: string
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const store = useMessageStore()
const router = useRouter()
const edit = () => {
  store.updateMessage('The data has been updated')
  router.push({ name: 'event-detail-view', params: { id: props.id } })
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
</script>

<template class="flex flex-col items-center gap-4 py-4">
  <p class="text-lg font-medium text-gray-700">Edit event here</p>
  <button @click="edit" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700 transition">Edit</button>
</template>
