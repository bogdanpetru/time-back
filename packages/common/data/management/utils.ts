import { addArray, last, nowInSeconds } from '@app/utils'
import { CurrentStrawBerry } from '../interface'

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

  return timeLeft - timeFromPreviousStart
}
