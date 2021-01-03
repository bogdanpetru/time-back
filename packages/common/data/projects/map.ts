import { removeUndefinedKeys } from '@app/utils'
import { Project, Strawberry, StrawberryType } from '../interface'

export const mapStrawberry = (data: any): Strawberry =>
  removeUndefinedKeys<Strawberry>({
    id: data.id,
    size: parseInt(data.size, 10),
    name: data.name,
    timeSpent: data.timeSpent || [],
    startTime: data.startTime || [],
    running: Boolean(data.running),
    notes: data.notes,
    finished: data.finished,
    type: data.type || StrawberryType.STRAWBERRY_TYPE_INTERVAL,
  })

export const mapProject = (data: any): Project =>
  removeUndefinedKeys<Project>({
    id: data.id,
    name: data.name,
    strawberrySize: data.strawberrySize,
    breakSize: data.breakSize,
    description: data.description,
    numberOfStrawberries: data.numberOfStrawberries,
    strawberries: data.strawberries,
    currentStrawBerry: mapStrawberry(data.currentStrawBerry || {}),
  })
