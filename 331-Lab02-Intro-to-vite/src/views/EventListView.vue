<script setup lang="ts">
//import EventCard from '@/components/EventCard.vue'
import CatOrg from '@/components/CatOrg.vue'
import type { Event } from '@/type'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref<Event[] | null>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/pleann/331-Lab02-Intro-to-vite-test-server/events')
    .then((response) => {
      events.value = response.data
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<template>
      <h1>Event for good</h1>
      <!-- new element -->
  <!-- <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div> -->
  <div class="events">
    <CatOrg v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
