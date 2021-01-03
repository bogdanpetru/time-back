import { FunctionComponent, useReducer, useEffect } from 'react'
import { getProjects } from '@app/data/projects'
import DataContext from './context'
import { Project } from '../interface'
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
        payload: projects,
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
    getProjects: () => state.projects,
    getProject: (projectId): Project => {
      return state.projects.list.find((project) => project.id === projectId)
    },
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
