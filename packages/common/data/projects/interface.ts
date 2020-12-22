export interface StrawberryConfig {
  startTime?: number
  endTime?: number
  notes?: string
  name?: string
}

export interface Strawberry extends StrawberryConfig {
  id: string
}

export interface ProjectDescription {
  name: string
  strawberrySize: number
  breakSize?: number
  description?: string
  numberOfStrawberries?: number
  strawberries?: Strawberry[]
}

export interface Project extends ProjectDescription {
  id: string
}
