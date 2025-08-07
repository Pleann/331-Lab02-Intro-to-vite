<script setup lang="ts">
//import EventCard from '@/components/EventCard.vue'
import CatOrg from '@/components/CatOrg.vue'
import type { Event } from '@/type'
import nProgress from 'nprogress'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventServices.ts'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value)
  return page.value < totalPages
})
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const page = computed(() => Number(route.query.page) || 1)
const perPage = computed(() => Number(route.query.perPage) || 2)

onMounted(() => {
  watchEffect(() => {
    nProgress.start()
    EventService.getEvents(perPage.value, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          router.push({
            name: '404-resource-view',
            params: { resource: 'event' },
          })
        } else {
          router.push({ name: 'network-error-view' })
        }
      })
      .finally(() => {
        nProgress.done()
      })
  })
})
</script>

<template>
  <h1 class="text-3xl font-bold mb-6 text-center">Event for good</h1>
  <!-- new element -->
  <!-- <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div> -->
  <div class="flex flex-col items-center">
    <CatOrg v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
        class="text-black-600 font-bold space-x-1 hover:underline text-left w-1/2"
        >&#60; Prev Page</RouterLink
      >

      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNexPage"
        class="text-black-600 font-bold space-x-1 hover:underline text-right w-1/2"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
/* .pagination {
  display: flex;
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
} */
</style>
