import { Project, CurrentStrawBerry } from '../interface'

export enum ActionTypes {
  SET_PROJECTS = 'SET_PROJECTS',
  SET_STRAWBERRY = 'SET_STRAWBERRY',
  SAVE_PROJECT = 'SAVE_PROJECT',
  EDIT_PROJECT = 'EDIT_PROJECT',
  DELETE_PROJECT = 'DELETE_PROJECT',
  UPATE_TIME = 'UPATE_TIME',
  SET_INITIAL_TIME = 'SET_INITIAL_TIME',
  START_STRAWBERRY = 'START_STRAWBERRY',
}

export type Action =
  | {
      type: ActionTypes.SET_STRAWBERRY
      projectId: string
      strawberry: CurrentStrawBerry
    }
  | {
      type: ActionTypes.START_STRAWBERRY
      projectId: string
      strawberry: CurrentStrawBerry
      today: number
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
  | {
      type: ActionTypes.UPATE_TIME
      projectId: string
      time: number
    }
  | {
      type: ActionTypes.SET_INITIAL_TIME
      time: { [key: string]: number }
    }
