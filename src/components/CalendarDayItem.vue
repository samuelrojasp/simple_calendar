<template>
  <li
    class="calendar-day-item"
    :class="{
        'calendar-day--not-current-month': !day.isCurrentMonth,
        'calendar-day--today': isToday
      }"
  >
    <span>{{ label }}</span>
  </li>
</template>

<script setup>
import { computed, toRefs } from 'vue'
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

const label = computed(() => dayjs(day.value.date).format("D"))

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
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-current-month {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
</style>