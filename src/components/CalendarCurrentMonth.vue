<template>
  <div class="calendar-current-month">{{ selectedMonth }}</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedDate: {
    type: Object,
    required: true
  },
})

const selectedMonth = computed(() => props.selectedDate.format('MMMM YYYY'))
</script>


<style scoped>
.calendar-current-month {
  font-size: 24px;
  font-weight: bold;
}
</style>