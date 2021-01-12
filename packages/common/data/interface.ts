export enum StrawberryType {
  STRAWBERRY_TYPE_INTERVAL = 'STRAWBERRY_TYPE_INTERVAL',
  STRAWBERRY_TYPE_PAUSE = 'STRAWBERRY_TYPE_PAUSE',
}

export interface Statistics {
  today: {
    completedStrawberries: number // per day
  }
  totalStrawberries: number // all time
  currentStreak: number // completed === project.numberOfStrawberries
}

export interface StrawberryConfig {
  size: number
  timeSpent?: number[]
  startTime?: number[]
  running?: boolean
  notes?: string
  name?: string
  finished?: boolean
  type?: StrawberryType
}

export interface Strawberry extends StrawberryConfig {
  id: string
}

export type CurrentStrawBerry = StrawberryConfig

export interface ProjectDescription {
  name: string
  strawberrySize: number
  breakSize?: number
  description?: string
  numberOfStrawberries?: number
  strawberries?: Strawberry[]
  currentStrawBerry?: CurrentStrawBerry
  statistics: Statistics
}

export interface Project extends ProjectDescription {
  id: string
}
