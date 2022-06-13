/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import CalendarDayItem from '../src/components/CalendarDayItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useEventStore } from '../src/stores/events'

let wrapper
const pinia = createTestingPinia()
const store = useEventStore()

describe('CalendarDayItem Tests', () => {
  beforeEach(() => {
    wrapper = mount(CalendarDayItem, {
      global: {
        plugins: [pinia]
      },
      propsData: {
        day: {
          date: dayjs().format('YYYY-MM-DD'),
          isCurrentMonth: true
        }
      }
    })
  })

  it('should render', () => {
    expect(wrapper.find('.calendar-day-item').exists()).toBe(true)
  })

  it('should render the number of the day of the month', () => {
    console.log(wrapper.find('.calendar-day-item span').text())
    expect(wrapper.find('.calendar-day-item span').text()).toBe(dayjs(wrapper.props().day.date).format('D'))
  })
})
