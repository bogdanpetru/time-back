import { FunctionComponent, useReducer, useEffect } from 'react'
import { getProjects } from '@app/data/projects'
import DataContext from './context'
import { resetStrawberry } from '@app/data/projects'
import {
  State,
  Reducer,
  ActionTypes,
  DataManagement,
  Action,
} from './interface'
import reducer from './reducer'

const useInitialProjects = (state: State, dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    ;(async () => {
      if (state.projects.list.length) {
        return
      }
      const projects = await getProjects()
      dispatch({
        type: ActionTypes.SET_PROJECTS,
        projects,
      })
    })()
  }, [dispatch, state])
}

const DataProvider: FunctionComponent = (props) => {
  const initialState: State = {
    projects: {
      list: [],
      loading: true,
    },
  }

  const [state, dispatch] = useReducer<Reducer, State>(
    reducer,
    null,
    () => initialState
  )

  useInitialProjects(state, dispatch)

  const api = {
    getProjects: () => [state.projects.list, state.projects.loading],
    getProject: (projectId) => [
      state.projects.list.find((project) => project.id === projectId),
      state.projects.loading,
    ],
    resetStrawberry: async (project) => {
      const newStrawberry = await resetStrawberry(project)
      dispatch({
        type: ActionTypes.RESET_STRAWBERRY,
        projectId: project.id,
        strawberry: newStrawberry,
      })
      return newStrawberry
    },
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
