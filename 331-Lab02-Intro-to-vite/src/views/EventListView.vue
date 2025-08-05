<script setup lang="ts">
//import EventCard from '@/components/EventCard.vue'
import CatOrg from '@/components/CatOrg.vue'
import type { Event } from '@/type'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventServices.ts'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 2)
  return page.value < totalPages
})
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const page = computed(() => Number(route.query.page) || 1)
const perPage = computed(() => Number(route.query.perPage) || 2)

onMounted(() => {
  watchEffect(() => {
    events.value = null
    EventService.getEvents(perPage.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
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
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNexPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
