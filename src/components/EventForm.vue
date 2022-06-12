<template>
  <div class="event-form">
    <h2>New event</h2>
    <form @submit.prevent="addEvent">
      <div class="form-group">
        <label for="event-title">Description</label>
        <input type="text" class="form-control" v-model="eventDescription" placeholder="add the description here" required>
      </div>
      <div class="form-group">
        <label for="event-date">Date</label>
        <input type="date" class="form-control" id="event-date" v-model="eventDate" required>
      </div>
      <button>Add Event</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEventStore } from '../stores/events'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const eventDate = ref(dayjs().format('YYYY-MM-DD'))
const eventDescription = ref('')
const eventStore = useEventStore()

const addEvent = () => {
  const event = {
    id: uuidv4(),
    date: eventDate.value,
    description: eventDescription.value,
  }
  eventStore.addEvent(event)
  clearForm()
}

const clearForm = () => {
  eventDate.value = dayjs().format('YYYY-MM-DD')
  eventDescription.value = ''
}

</script>