import { last, addArray, nowInSeconds, isNumber } from '@app/utils'
import { CurrentStrawBerry, Strawberry } from './interface'

export const getTimeLeft = (strawberry: Strawberry): number => {
  if (!strawberry) {
    return
  }
  if (!strawberry?.startTime.length) {
    return strawberry.size
  }

  const timeLeft =
    strawberry.size -
    ((strawberry?.timeSpent && addArray(strawberry.timeSpent)) || 0)

  const timeFromPreviousStart =
    strawberry.running && strawberry.startTime.length
      ? nowInSeconds() - last(strawberry.startTime)
      : 0

  return timeLeft - timeFromPreviousStart
}

export const getTimeLeftRatio = (
  strawberry: CurrentStrawBerry,
  time: number
): number => {
  let timeSpentRatio: number = 0
  if (isNumber(strawberry?.size) && isNumber(time)) {
    timeSpentRatio = time / strawberry?.size
  }
  return timeSpentRatio
}

export const getRemainingStrawberryTime = (
  strawberry: CurrentStrawBerry
): number => {
  if (!strawberry?.startTime?.length) {
    return strawberry.size
  }

  const timeLeft =
    strawberry.size -
    ((strawberry?.timeSpent && addArray(strawberry.timeSpent)) || 0)

  const timeFromPreviousStart =
    strawberry.running && strawberry?.startTime?.length
      ? nowInSeconds() - last<number>(strawberry.startTime)
      : 0

  const time = timeLeft - timeFromPreviousStart

  return time || 0
}
