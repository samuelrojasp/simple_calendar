<template>
  <li
    class="calendar-day-item"
    :class="{
      'calendar-day--not-current-month': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
  >
    <span>{{ label }}</span>
    <p class="event" v-for="event in events" :key="event.description">{{ event.description }}</p>
  </li>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { useEventStore } from '../stores/events'
import dayjs from 'dayjs'

const props = defineProps({
  day: {
    type: Object,
    required: true
  },
  isCurrentMonth: {
    type: Boolean,
    default: false
  },
  isToday: {
    type: Boolean,
    default: false
  }
})

const { day, isCurrentMonth, isToday } = toRefs(props)
const eventStore = useEventStore()

const label = computed(() => dayjs(day.value.date).format("D"))
const events = computed(() => {
  return eventStore.events.filter(event => {
    return dayjs(event.date).format("YYYY-MM-DD") === day.value.date
  })
})

</script>

<style scoped>
.calendar-day-item {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
}

.calendar-day-item > span {
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current-month {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today > span{
  padding: 3px 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}

.event {
  text-align: left;
  margin: 5px 0;
  padding: 2px 6px;
  font-size: 12px;
  background-color: var(--grey-200);
  border-radius: 9999px;
}
</style>