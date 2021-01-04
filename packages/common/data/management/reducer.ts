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
    case ActionTypes.RESET_STRAWBERRY:
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
    default:
      return state
  }
}

export default reducer
