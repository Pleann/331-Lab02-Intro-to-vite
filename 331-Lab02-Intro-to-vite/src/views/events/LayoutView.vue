<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Event } from '@/type'
import EventService from '@/services/EventServices'
import { useRouter } from 'vue-router'

const event = ref<Event | null>(null)
const error = ref<string | null>(null)

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})
const router = useRouter()

onMounted(() => {
  EventService.getEvent(parseInt(props.id))
    .then((response) => {
      event.value = response.data
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        router.push({
        name: '404-resource-view',
        params: { resource: 'event' }
      })
      } else {
        router.push({ name: 'network-error-view' })
      }
    })
})
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
    <h1>{{ event.title }}</h1>
    <nav>
      <RouterLink :to="{ name: 'event-detail-view' }">Details</RouterLink>
      |
      <RouterLink :to="{ name: 'event-register-view' }">Register</RouterLink>
      |
      <RouterLink :to="{ name: 'event-edit-view' }">Edit</RouterLink>
    </nav>
    <RouterView :event="event" />
  </div>
  <div v-else-if="error">
    <p class="error-message">{{ error }}</p>
  </div>
</template>
