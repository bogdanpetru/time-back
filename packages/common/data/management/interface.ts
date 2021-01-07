import { Project, Strawberry } from '../interface'

export enum ActionTypes {
  SET_PROJECTS = 'SET_PROJECTS',
  SET_STRAWBERRY = 'SET_STRAWBERRY',
}

export type Action =
  | {
      type: ActionTypes.SET_STRAWBERRY
      projectId: string
      strawberry: Strawberry
    }
  | {
      type: ActionTypes.SET_PROJECTS
      projects: Project[]
    }

export interface State {
  projects: {
    list: Project[]
    loading: boolean
  }
}

export interface Reducer {
  (state: State, action: Action): State
}

type Data<T> = [T, boolean]

export interface DataManagement {
  getProjects(): Data<Project[]>
  getProject(projectId: string): Data<Project>
  resetStrawberry(projectId: string): Promise<Strawberry>
  startStrawberry(projectId: string): Promise<void>
  pauseStrawberry(projectId: string): Promise<void>
}
