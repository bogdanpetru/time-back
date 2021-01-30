import { FunctionComponent, useReducer, useRef, useEffect } from 'react'
import DataContext from './context'

import { Reducer } from './reducer'
import { State } from './state'
import reducer from './reducer'
import { Project, Strawberry, ProjectDescription } from '../interface'
import * as effects from './effects'

type Data<T> = [T, boolean]

export interface DataManagement {
  getProjects(): Data<Project[]>
  getProject(projectId: string): Data<Project>
  getTime(projectId: string): number
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
    time: {},
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

  const getState = () => getStateRef.current()

  const api = {
    getProjects: () => [state.projects.list, state.projects.loading],
    getProject: (projectId) => [
      state.projects.list.find((project) => project.id === projectId),
      state.projects.loading,
    ],
    getTime: (projectId) => state.time[projectId] || null,
    resetStrawberry: effects.resetStrawberry(dispatch, getState),
    startStrawberry: effects.startStrawberry(dispatch, getState),
    pauseStrawberry: effects.pauseStrawberry(dispatch, getState),
    deleteProject: effects.getDeleteProject(dispatch),
    updateProject: effects.getUpdateProject(dispatch, getState),
    createProject: effects.getCreateProject(dispatch, getState),
    initializeData: effects.initializeData(dispatch, getState),
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
