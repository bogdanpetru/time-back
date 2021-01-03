import { last, addArray, nowInSeconds } from '@app/utils'
import { Strawberry } from '../interface'

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
