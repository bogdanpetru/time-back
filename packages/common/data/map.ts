import { removeUndefinedKeys } from '@app/utils'
import { Strawberry, StrawberryType, Project } from './interface'

export const mapStrawberry = (data: any): Strawberry => {
  return removeUndefinedKeys<Strawberry>({
    id: data.id,
    size: parseInt(data.size, 10) || 0,
    name: data.name,
    timeSpent: data.timeSpent || [],
    startTime: data.startTime || [],
    running: Boolean(data.running),
    notes: data.notes,
    finished: data.finished,
    type: data.type || StrawberryType.STRAWBERRY_TYPE_INTERVAL,
  })
}

export const mapProject = (data: any): Project =>
  removeUndefinedKeys<Project>({
    id: data.id,
    name: data.name,
    strawberrySize: data.strawberrySize,
    breakSize: parseInt(data.breakSize, 10),
    description: data.description,
    numberOfStrawberries: data.numberOfStrawberries,
    strawberries: data.strawberries,
    currentStrawBerry: mapStrawberry(
      data.currentStrawBerry || {
        size: data.strawberrySize,
      }
    ),
    statistics: {
      ...data?.statistics,
      today: {
        date: data?.statistics?.today?.date,
        completedStrawberries:
          data?.statistics?.today?.completedStrawberries || 0,
      },
      totalStrawberries: data?.statistics?.totalStrawberries || 0,
      numberOfDailyCompletedGoals:
        data?.statistics?.numberOfDailyCompletedGoals || 0,
    },
  })
