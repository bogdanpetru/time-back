import { SECOND_UNIT, MINUTE_UNIT, HOUR_UNIT } from '@app/utils'

const padWithZero = (no: number): string => {
  let result = `${no}`

  if (result.length < 2) {
    result = `0${result}`
  }

  return result
}

export const formatTime = (ms: number): string => {
  let timeLeftToProcess = ms
  const hours = Math.floor(timeLeftToProcess / HOUR_UNIT)
  timeLeftToProcess -= hours * HOUR_UNIT
  const minutes = Math.floor(timeLeftToProcess / MINUTE_UNIT)
  timeLeftToProcess -= minutes * MINUTE_UNIT
  const seconds = Math.floor(timeLeftToProcess / SECOND_UNIT)

  const list = []
  if (hours) list.push(hours)
  list.push(minutes)
  list.push(seconds || 0)

  return list.map((item: number) => padWithZero(item)).join(':')
}
