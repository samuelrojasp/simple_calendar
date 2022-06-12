<template>
  <div class="calendar">
    <div class="calendar__header">
      <div class="calendar__header__left">
        <button class="calendar__header__left__button" @click="changeMonth('prev')">&lt;</button>
      </div>
      <div class="calendar__header__center">
        <h2>{{ monthToShow }} {{ year }}</h2>
      </div>
      <div class="calendar__header__right">
        <button class="calendar__header__right__button" @click="changeMonth('next')">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed, ref } from 'vue';

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth())
const monthToShow = computed(() => month.value + 1)

const emit = defineEmits(['changeMonth'])

const changeMonth = (action) => {
  const date = action === `prev` ? new Date(year.value, month.value - 1, 1) : new Date(year.value, month.value + 1, 1)
  year.value = date.getFullYear()
  month.value = date.getMonth()
  emit('changeMonth', { year: year.value, month: month.value })
}
</script>