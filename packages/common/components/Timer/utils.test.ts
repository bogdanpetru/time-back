import { formatTime } from './utils'

const secondUnit = 1000
const minuteUnit = secondUnit * 60
const hourUnit = minuteUnit * 60

describe('formatTime()', () => {
  describe.each([
    [2 * hourUnit, '02:00:00'],
    [3 * hourUnit + 3 * minuteUnit + 23 * secondUnit, '03:03:23'],
    [3 * minuteUnit + 23 * secondUnit, '03:23'],
    [3 * minuteUnit + 3 * secondUnit, '03:03'],
    [3 * secondUnit, '00:03'],
    [0.1 * secondUnit, '00:00'],
    [10 * hourUnit + 48 * secondUnit, '10:00:48'],
  ])('$d is formatted as $s', (input: number, expected: string) => {
    test(`returns ${expected}`, () => {
      expect(formatTime(input)).toBe(expected)
    })
  })
})
