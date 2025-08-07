<script setup lang="ts">
import { useEventStore } from '@/stores/event'
import { storeToRefs } from 'pinia'

const store = useEventStore()
const { event } = storeToRefs(store)

// onMounted(() => {
//   EventService.getEvent(parseInt(props.id))
//     .then((response) => {
//       event.value = response.data
//     })
//     .catch((err) => {
//       // Set the error message here
//       error.value = `Failed to fetch event with ID ${props.id}. Error: ${err.message}`
//       console.error(error.value)
//     })
// })
</script>

<template>
  <div v-if="event">
    <h1 class="text-3xl font-bold text-gray-800">{{ event.title }}</h1>
    <nav class="text-xl gap-4 text-black-600 font-bold">
      <RouterLink :to="{ name: 'event-detail-view' }" class="hover:underline transition">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view' }" class="hover:underline transition">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit-view' }" class="hover:underline transition">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
  <!-- <div v-else-if="error">
    <p class="error-message">{{ error }}</p>
  </div> -->
</template>
