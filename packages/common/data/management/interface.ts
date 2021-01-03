import { Project } from '../interface'

export enum ActionTypes {
  SET_PROJECTS = 'SET_PROJECTS',
}

export type Action = {
  type: ActionTypes.SET_PROJECTS
  payload: Project[]
}

interface StateProjects {
  list: Project[]
  loading: boolean
}

export interface State {
  projects: StateProjects
}

export interface Reducer {
  (state: State, action: Action): State
}

export interface DataManagement {
  getProjects(): StateProjects
  getProject(projectId: string): Project
}
