import { Reducer, State, Action, ActionTypes } from './interface'

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
    default:
      return state
  }
}

export default reducer
