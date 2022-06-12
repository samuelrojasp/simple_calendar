import { defineStore } from 'pinia'

export const useEventStore = defineStore('events', {
  state: () => {
    return {
      events: []
    }
  },
  actions: {
    addEvent(event) {
      this.events.push(event)
    }
  }
})