import { FunctionComponent, useReducer, useRef, useEffect } from 'react'
import DataContext from './context'

import { Reducer } from './reducer'
import { State } from './state'
import reducer from './reducer'
import { Project, Strawberry, ProjectDescription, CurrentStrawBerry, StrawberryType } from '../interface'
import * as effects from './effects'
import * as selectors from './selectors'
import { Action } from './actions'

type Data<T> = [T, boolean]

export interface DataManagement {
  getProjects(): Data<Project[]>
  getProject(projectId: string): Data<Project>
  getTime(projectId: string): number
  resetStrawberry(projectId: string): Promise<Strawberry>
  startStrawberry(projectId: string): Promise<CurrentStrawBerry>
  pauseStrawberry(projectId: string): Promise<CurrentStrawBerry>
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
      selectors.getProject(state, projectId),
      state.projects.loading,
    ],
    getTime: (projectId) => {
      let time = selectors.getTime(state, projectId)
      if (typeof time !== 'number') {
        const project = selectors.getProject(state, projectId)
        time = project.currentStrawBerry.type === StrawberryType.STRAWBERRY_TYPE_PAUSE && project.breakSize ?
          project.breakSize : project.strawberrySize
      }
      return time
    },
    resetStrawberry: effects.resetStrawberry(dispatch, getState),
    startStrawberry: effects.startStrawberry(dispatch, getState),
    pauseStrawberry: effects.pauseStrawberry(dispatch, getState),
    deleteProject: effects.getDeleteProject(dispatch),
    updateProject: effects.updateProject(dispatch, getState),
    createProject: effects.createProject(dispatch, getState),
    initializeData: effects.initializeData(dispatch, getState),
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
