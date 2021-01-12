import {
  Project,
  Strawberry,
  ProjectDescription,
  CurrentStrawBerry,
} from '../interface'

export enum ActionTypes {
  SET_PROJECTS = 'SET_PROJECTS',
  SET_STRAWBERRY = 'SET_STRAWBERRY',
  SAVE_PROJECT = 'SAVE_PROJECT',
  EDIT_PROJECT = 'EDIT_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
}

export type Action =
  | {
      type: ActionTypes.SET_STRAWBERRY
      projectId: string
      strawberry: CurrentStrawBerry
    }
  | {
      type: ActionTypes.SET_PROJECTS
      projects: Project[]
    }
  | {
      type: ActionTypes.SAVE_PROJECT
      project: Project
    }
  | {
      type: ActionTypes.EDIT_PROJECT
      project: Project
    }
  | {
      type: ActionTypes.DELETE_PROJECT
      projectId: string
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
  finishStrawberry(projectId: string): Promise<void>
  deleteProject(projectId: string): Promise<void>
  saveProject(
    projectId: string,
    projectDetails: ProjectDescription
  ): Promise<string>
  loadProjects(): Promise<Project[]>
}
