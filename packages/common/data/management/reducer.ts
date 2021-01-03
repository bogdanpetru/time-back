import { Reducer, State, Action, ActionTypes } from './interface'

const reducer: Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_PROJECTS:
      return {
        ...state,
        projects: {
          loading: false,
          list: action.payload,
        },
      }
    default:
      return state
  }
}

export default reducer
