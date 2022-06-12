<template>
  <div class="calendar">
    <div class="calendar__header">
      <CalendarCurrentMonth
        :selected-date="selectedDate"
        class-name="calendar__header__current-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <CalendarWeekdays />

    <ol class="calendar-grid">
      <CalendarDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-today="day.date === today"
      />
    </ol>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import dayjs from 'dayjs'
import weekday from "dayjs/plugin/weekday"
import weekOfYear from "dayjs/plugin/weekOfYear"
import CalendarDayItem from './CalendarDayItem.vue'
import CalendarCurrentMonth from './CalendarCurrentMonth.vue'
import CalendarDateSelector from './CalendarDateSelector.vue'
import CalendarWeekdays from './CalendarWeekdays.vue'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

const selectedDate = ref(dayjs())
const days = computed(() => [
  ...previousMonthDays.value,
  ...currentMonthDays.value,
  ...nextMonthDays.value,
])
const today = computed(() => dayjs().format('YYYY-MM-DD'))
const month = computed(() => Number(selectedDate.value.format('M')))
const year = computed(() => Number(selectedDate.value.format('YYYY')))
const numberOfDaysInMonth = computed(() => dayjs(selectedDate.value).daysInMonth())
const currentMonthDays = computed(() => [...Array(numberOfDaysInMonth)].map((day, index) => {
  return {
    date: dayjs(`${year.value}-${month.value}-${index + 1}`).format('YYYY-MM-DD'),
    isCurrentMonth: true,
  }
}))
const previousMonthDays = computed(() => {
  const firstDaysOfTheMOnthWeekday = getWeekday(currentMonthDays.value[0].date)
  const previousMonth = dayjs(`${year.value}-${month.value - 1}-01`).subtract(1, 'month')
  const visibleNumberOfDaysFromPreviousMonth = firstDaysOfTheMOnthWeekday ? firstDaysOfTheMOnthWeekday - 1 : 6
  const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays.value[0].date).subtract(1, 'day').date()

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format('YYYY-MM-DD'),
      isCurrentMonth: false,
    }
  })
})
const nextMonthDays = computed(() => {
  const lastDayOfTheMonthWeekday = getWeekday(`${year.value}-${month.value}-${currentMonthDays.value.length}`)
  const nextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, 'month')
  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 7 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format('YYYY-MM-DD'),
      isCurrentMonth: false,
    }
  })
})

const getWeekday = (date) => dayjs(date).weekday()
const selectDate = (newSelectedDate) => {
  selectedDate.value = newSelectedDate
}
</script>