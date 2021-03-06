<template>
  <div class="calendar">
    <div class="calendar-header">
      <CalendarCurrentMonth
        :selected-date="selectedDate"
        class="calendar__header__current-month"
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

    <div class="new-event">
      <button @click="isModalOpen = true">New Event</button>
    </div>

    <transition name="modal">
      <modal v-if="isModalOpen" @close="isModalOpen = false">
        <template v-slot:form>
          <EventForm @close="isModalOpen = false" />
        </template>
      </modal>
    </transition>
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
import EventForm from './EventForm.vue'
import modal from './ModalWindow.vue'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)

const selectedDate = ref(dayjs())
const days = computed(() => [
  ...previousMonthDays.value,
  ...currentMonthDays.value,
  ...nextMonthDays.value,
])


const isModalOpen = ref(false)
const today = computed(() => dayjs().format('YYYY-MM-DD'))
const month = computed(() => Number(selectedDate.value.format('M')))
const year = computed(() => Number(selectedDate.value.format('YYYY')))
const numberOfDaysInMonth = computed(() => dayjs(selectedDate.value).daysInMonth())
const currentMonthDays = computed(() => [...Array(numberOfDaysInMonth.value)].map((day, index) => {
  return {
    date: dayjs(`${year.value}-${month.value}-${index + 1}`).format('YYYY-MM-DD'),
    isCurrentMonth: true,
  }
}))

const previousMonthDays = computed(() => {
  const firstDaysOfTheMonthWeekday = getWeekday(
    currentMonthDays.value[0].date
  )

  const previousMonth = dayjs(`${year.value}-${month.value}-01`).subtract(
    1,
    'month'
  )

  const visibleNumberOfDaysFromPreviousMonth = firstDaysOfTheMonthWeekday
    ? firstDaysOfTheMonthWeekday - 1
    : 6

  const previousMonthLastMondayDayOfMonth = dayjs(
    currentMonthDays.value[0].date
  )
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date()

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`
      ).format('YYYY-MM-DD'),
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

<style scoped>
.calendar {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: right;
  padding-right: 5px;
}

.calendar-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}

.new-event {
  background: transparent;
  padding: 10px;
  text-align: left;
}

.new-event button {
  background: rgba(255,255,255,0.7);
  padding: 5px;
  border: 1px solid black;
  color: var(--grey-800);
  font-size: 18px;
  cursor: pointer;
}

.new-event button:active {
  background: rgba(255,255,255,0.5);
}
</style>