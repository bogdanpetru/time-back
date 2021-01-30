import { removeUndefinedKeys } from '@app/utils'
import { getRemainingStrawberryTime } from './utils'
import { Strawberry, StrawberryType, Project } from './interface'

export const mapStrawberry = (data: any): Strawberry => {
  const strawberry = {
    id: data.id,
    size: parseInt(data.size, 10),
    name: data.name,
    timeSpent: data.timeSpent || [],
    startTime: data.startTime || [],
    running: Boolean(data.running),
    notes: data.notes,
    finished: data.finished,
    type: data.type || StrawberryType.STRAWBERRY_TYPE_INTERVAL,
  }
  const time = getRemainingStrawberryTime(strawberry)
  return removeUndefinedKeys<Strawberry>({
    ...strawberry,
    time,
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
    currentStrawBerry: mapStrawberry(data.currentStrawBerry || {}),
    statistics: {
      ...data?.statistics,
      today: {
        completedStrawberries:
          data?.statistics?.today?.completedStrawberries || 0,
      },
      totalStrawberries: data?.statistics?.totalStrawberries || 0,
    },
  })
