import { Project } from '../interface'

export interface State {
  projects: {
    list: Project[]
    loading: boolean
  }
  time: {
    [key: string]: number
  }
}
