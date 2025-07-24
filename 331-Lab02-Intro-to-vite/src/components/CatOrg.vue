<script setup lang="ts">
import type { Event } from '@/type'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="catorg">
    <p>{{ event.category }}</p>
    <p>{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.catorg {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
  text-align: right;
  font-size: 10px;
}
.catorg:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
