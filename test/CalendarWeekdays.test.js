/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CalendarWeekdays from '../src/components/CalendarWeekdays.vue'

describe('CalendarWeekdays Tests', () => {
  it('should count weekdays and find 7 of them', () => {
    const wrapper = mount(CalendarWeekdays)
    expect(wrapper.findAll('li').length).toBe(7)
  })
})