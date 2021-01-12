import {
  Project,
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