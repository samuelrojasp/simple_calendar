<template>
  <div class="event-form">
    <form @submit.prevent="addEvent">
      <input type="text" class="form-control" v-model="eventDescription" placeholder="Add the event description here" required>
      <input type="date" class="form-control" id="event-date" v-model="eventDate" required>
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
const emits = defineEmits(['close'])

const addEvent = () => {
  const event = {
    id: uuidv4(),
    date: eventDate.value,
    description: eventDescription.value,
  }
  eventStore.addEvent(event)
  clearForm()
  emits('close')
}

const clearForm = () => {
  eventDate.value = dayjs().format('YYYY-MM-DD')
  eventDescription.value = ''
}

</script>

<style scoped>
form {
  width: 100%;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #999;
  font-weight: bold;
  box-sizing:border-box;
}

input::placeholder {
  color: #ccc;
}

button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
</style>