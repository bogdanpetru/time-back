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
  numberOfDailyCompletedGoals: number
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

export interface CurrentStrawBerry extends StrawberryConfig {
  time?: number
}

export interface ProjectDescription {
  name: string
  strawberrySize: number
  numberOfStrawberries?: number
  breakSize?: number
  description?: string
  strawberries?: Strawberry[]
  currentStrawBerry?: CurrentStrawBerry
  statistics: Statistics
}

export interface Project extends ProjectDescription {
  id: string
}
