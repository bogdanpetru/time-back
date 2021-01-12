import { FunctionComponent, useReducer } from 'react'
import DataContext from './context'
import { State, Reducer, DataManagement } from './interface'
import reducer from './reducer'
import {
  getResetStrawberry,
  getLoadProjects,
  getStartStrawberry,
  getPauseStrawberry,
  getFinishStrawberry,
  getSaveProject,
  getDeleteProject,
} from './effects'

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

  const api = {
    getProjects: () => [state.projects.list, state.projects.loading],
    getProject: (projectId) => [
      state.projects.list.find((project) => project.id === projectId),
      state.projects.loading,
    ],
    resetStrawberry: getResetStrawberry(dispatch, state),
    startStrawberry: getStartStrawberry(dispatch, state),
    pauseStrawberry: getPauseStrawberry(dispatch, state),
    finishStrawberry: getFinishStrawberry(dispatch, state),
    deleteProject: getDeleteProject(dispatch),
    saveProject: getSaveProject(dispatch, state),
    loadProjects: getLoadProjects(dispatch, state),
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
