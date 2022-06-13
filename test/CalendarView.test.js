/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarView from '../src/components/CalendarView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useEventStore } from '../src/stores/events'

let wrapper
const pinia = createTestingPinia()
const store = useEventStore()

describe('CalendarView Tests', () => {
  beforeEach(() => {
    wrapper = mount(CalendarView, {
      global: {
        plugins: [pinia]
      }
    })
  })

  it('Should render calendar element', () => {
    expect(wrapper.find('div.calendar').exists()).toBe(true)
  })
})