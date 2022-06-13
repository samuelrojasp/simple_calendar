<template>
  <div class="calendar-date-selector">
    <span class="previousSelector" @click="selectPrevious">&lt;</span>
    <span class="todaySelector" @click="selectCurrent">Today</span>
    <span class="nextSelector" @click="selectNext">&gt;</span>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  currentDate: {
    type: String,
    required: true
  },
  selectedDate: {
    type: Object,
    required: true
  }
})

const { currentDate, selectedDate } = toRefs(props)

const emits = defineEmits(['dateSelected'])

const selectPrevious = () => {
  let newSelectedDate = dayjs(selectedDate.value).subtract(1, 'month')
  emits('dateSelected', newSelectedDate)
}

const selectCurrent = () => {
  let newSelectedDate = dayjs(currentDate.value)
  emits('dateSelected', newSelectedDate)
}

const selectNext = () => {
  let newSelectedDate = dayjs(selectedDate.value).add(1, 'month')
  emits('dateSelected', newSelectedDate)
}
</script>

<style scoped>
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  color: var(--grey-800)
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
  padding: 5px 10px;
}

.calendar-date-selector > *:hover {
  background-color: #ddd;
}

.calendar-date-selector > *:active {
  background-color: #aaa;
}

.previousSelector, .nextSelector {
  border-radius: 50%;
}

.todaySelector {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 5px;
}
</style>