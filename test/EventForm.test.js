/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import EventForm from '../src/components/EventForm.vue'
import { createTestingPinia } from '@pinia/testing'
import { useEventStore } from '../src/stores/events'

let wrapper
const pinia = createTestingPinia()
const store = useEventStore()
const uuidv4 = () => `123e4567-e89b-12d3-a456-426614174000`

describe('EventForm Tests', () => {
  beforeEach(() => {
    wrapper = mount(EventForm, {
      global: {
        plugins: [pinia]
      }
    })
  })

  it('should render', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  // it('should save event to store', async () => {
  //   const event = {
  //     uuid: uuidv4(),
  //     date: '2020-06-12',
  //     description: 'Test Event',
  //   }

  //   await wrapper.find('input[type="text"]').setValue(event.description)
  //   await wrapper.find('input[type="date"]').setValue(event.date)
  //   await wrapper.find('form').trigger('submit')

  //   expect(store.addEvent).toHaveBeenCalledTimes(1)
  // })
})