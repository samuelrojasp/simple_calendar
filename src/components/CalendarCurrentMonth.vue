<template>
  <div class="clalendar-current-month">{{ selectedMonth }}</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedDate: {
    type: Object,
    required: true
  },
})

const selectedMonth = computed(() => props.selectedDate.format('MMMM'))
</script>
