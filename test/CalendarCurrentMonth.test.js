/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import CalendarCurrentMonth from '../src/components/CalendarCurrentMonth.vue'

let wrapper
const date = dayjs()

describe('CalendarCurrentMonth Tests', () => {
  beforeEach(() => {
    wrapper = mount(CalendarCurrentMonth, {
      propsData: {
          selectedDate: date
        }
    })
  })
  
  it('should render', () => {
    expect(wrapper.find('div.calendar-current-month').exists()).toBe(true)
  })

  it('should render the current month', () => {
    expect(wrapper.find('div.calendar-current-month').text()).toBe(date.format('MMMM YYYY'))
  })
})