import { FunctionComponent, useReducer, useRef, useEffect } from 'react'
import DataContext from './context'

import { Reducer } from './reducer'
import { State } from './state'
import reducer from './reducer'
import { Project, Strawberry, ProjectDescription } from '../interface'
import {
  getResetStrawberry,
  getInitializeData,
  getStartStrawberry,
  getPauseStrawberry,
  getFinishStrawberry,
  getUpdateProject,
  getCreateProject,
  getDeleteProject,
} from './effects'

type Data<T> = [T, boolean]

export interface DataManagement {
  getProjects(): Data<Project[]>
  getProject(projectId: string): Data<Project>
  resetStrawberry(projectId: string): Promise<Strawberry>
  startStrawberry(projectId: string): Promise<void>
  pauseStrawberry(projectId: string): Promise<void>
  deleteProject(projectId: string): Promise<void>
  updateProject(project: Project): Promise<Project>
  createProject(projectDetails: ProjectDescription): Promise<Project>
  initializeData(): Promise<Project[]>
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
  const getStateRef = useRef(() => state)

  useEffect(() => {
    getStateRef.current = () => state
  }, [state, getStateRef])

  const api = {
    getProjects: () => [state.projects.list, state.projects.loading],
    getProject: (projectId) => [
      state.projects.list.find((project) => project.id === projectId),
      state.projects.loading,
    ],
    resetStrawberry: getResetStrawberry(dispatch, () => getStateRef.current()),
    startStrawberry: getStartStrawberry(dispatch, () => getStateRef.current()),
    pauseStrawberry: getPauseStrawberry(dispatch, () => getStateRef.current()),
    deleteProject: getDeleteProject(dispatch),
    updateProject: getUpdateProject(dispatch, () => getStateRef.current()),
    createProject: getCreateProject(dispatch, () => getStateRef.current()),
    initializeData: getInitializeData(dispatch, () => getStateRef.current()),
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
