import { Project } from '../interface'

export interface State {
  projects: {
    list: Project[]
    loading: boolean
  }
}