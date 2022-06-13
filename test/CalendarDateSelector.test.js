/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import CalendarDateSelector from '../src/components/CalendarDateSelector.vue'

let wrapper
const selectedDate = dayjs()
const currentDate = selectedDate.format('YYYY-MM-DD')

describe('Date selector tests', () => {
  beforeEach(() => {
    wrapper = mount(CalendarDateSelector, {
      propsData: {
        currentDate,
        selectedDate
      }
    })
  })

  it('should render', () => {
    expect(wrapper.find('div.calendar-date-selector').exists()).toBe(true)
  })

  it('should emit dateSelected event on select previous month', async () => {
    await wrapper.find('.previousSelector').trigger('click')
    expect(wrapper.emitted().dateSelected).toBeTruthy()
    expect(dayjs(wrapper.emitted().dateSelected[0][0]).format('YYYY-MM-DD')).toBe(dayjs(currentDate).subtract(1, 'month').format('YYYY-MM-DD'))
  })

  it('should emit dateSelected event on select next month', async () => {
    await wrapper.find('.nextSelector').trigger('click')
    expect(wrapper.emitted().dateSelected).toBeTruthy()
    expect(dayjs(wrapper.emitted().dateSelected[0][0]).format('YYYY-MM-DD')).toBe(dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD'))
  })

  it('should emit dateSelected event on select today', async () => {
    await wrapper.find('.todaySelector').trigger('click')
    expect(wrapper.emitted().dateSelected).toBeTruthy()
    expect(dayjs(wrapper.emitted().dateSelected[0][0]).format('YYYY-MM-DD')).toBe(currentDate)
  })
})
