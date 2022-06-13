import { defineStore } from 'pinia'
import { getEvents, postEvents } from '../api/events'

export const useEventStore = defineStore('events', {
  state: () => {
    return {
      events: []
    }
  },
  actions: {
    addEvent(event) {
      this.events.push(event)
      postEvents(event)
    },
    getEvents() {
      this.events = getEvents()
    }
  }
})