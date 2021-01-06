import { Strawberry } from '@app/data/projects'
import { nowInSeconds } from '@app/utils'

export const addArray = (arr: number[]): number =>
  arr?.reduce((acc: number, item: number): number => acc + item, 0) || 0

export const last = (collection: any[]): any =>
  Array.isArray(collection) ? collection[collection.length - 1] : null

export const getRemainingTime = (strawberry: Strawberry): number => {
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
