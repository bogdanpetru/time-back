import { State } from './state'
import { Action, ActionTypes } from './actions'

export interface Reducer {
  (state: State, action: Action): State
}

const reducer: Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: {
          loading: false,
          list: action.projects,
        },
      }
    case ActionTypes.SET_STRAWBERRY:
      return {
        ...state,
        projects: {
          loading: false,
          list: state.projects.list.map((project) => {
            if (project.id === action.projectId) {
              return {
                ...project,
                currentStrawBerry: action.strawberry,
              }
            }
            return project
          }),
        },
      }
    case ActionTypes.SAVE_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          list: [...state.projects.list, action.project],
        },
      }
    case ActionTypes.EDIT_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          list: state.projects.list.map((project) => {
            if (project.id === action.project.id) {
              return {
                ...project,
                ...action.project,
              }
            }

            return project
          }),
        },
      }
    case ActionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: {
          ...state.projects,
          list: state.projects.list.filter(
            (project) => project.id !== action.projectId
          ),
        },
      }
    case ActionTypes.UPATE_TIME:
      return {
        ...state,
        time: {
          ...state.time,
          [action.projectId]: action.time,
        },
      }
    case ActionTypes.SET_INITIAL_TIME:
      console.log(action)
      return {
        ...state,
        time: action.time,
      }
    default:
      return state
  }
}

export default reducer
