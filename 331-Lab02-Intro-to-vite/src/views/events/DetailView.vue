<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import type { Event } from '@/type'
const props = defineProps<{
  event: Event
  id: string
}>()

const { event } = toRefs(props)
</script>

<template>
  <p class="text-lg font-medium text-gray-700">{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
  <p class="text-lg font-medium text-gray-700">{{ event.description }}</p>
</template>
