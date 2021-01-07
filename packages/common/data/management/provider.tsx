import { FunctionComponent, useReducer, useEffect } from 'react'
import { nowInSeconds, addArray } from '@app/utils'
import DataContext from './context'
import {
  State,
  Reducer,
  ActionTypes,
  DataManagement,
  Action,
} from './interface'
import {
  Strawberry,
  Project,
  mapStrawberry,
  setCurrentStrawberry,
  startStrawberry,
  pauseStrawberry,
  getProjects,
  createNewStrawberry,
} from '@app/data/projects'
import reducer from './reducer'
import { getRemainingStrawberryTime } from './utils'

const getProjectSelector = (state: State, projectId: String): Project =>
  state.projects.list.find((project) => project.id === projectId)

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

const getResetStrawberry = (dispatch: React.Dispatch<Action>, state: State) => (
  projectId: string
) => {
  const project = getProjectSelector(state, projectId)
  const strawberry = mapStrawberry({
    size: project.strawberrySize,
  })

  dispatch({
    type: ActionTypes.SET_STRAWBERRY,
    projectId,
    strawberry,
  })

  return setCurrentStrawberry(project.id, strawberry)
}

const getStartStrawberry = (dispatch: React.Dispatch<Action>, state: State) => (
  projectId: string
): Promise<void> => {
  const startTime = nowInSeconds()
  const project = getProjectSelector(state, projectId)

  const strawberry = {
    ...project.currentStrawBerry,
    running: true,
    startTime: [...(project.currentStrawBerry?.startTime || []), startTime],
  }

  dispatch({
    type: ActionTypes.SET_STRAWBERRY,
    projectId,
    strawberry,
  })

  return startStrawberry(projectId, startTime)
}

const getPauseStrawberry = (dispatch: React.Dispatch<Action>, state: State) => (
  projectId: string
): Promise<void> => {
  const project = getProjectSelector(state, projectId)
  const strawberry = project.currentStrawBerry

  let time = getRemainingStrawberryTime(strawberry)
  const timeSpent =
    strawberry.size -
    time -
    (strawberry?.timeSpent ? addArray(strawberry.timeSpent) : 0)

  dispatch({
    type: ActionTypes.SET_STRAWBERRY,
    projectId,
    strawberry: {
      ...strawberry,
      running: false,
      timeSpent: [...strawberry.timeSpent, timeSpent],
    },
  })

  return pauseStrawberry(projectId, timeSpent)
}

const getFinishStrawberry = (
  dispatch: React.Dispatch<Action>,
  state: State
) => (projectId: string): Promise<Strawberry> => {
  const project = getProjectSelector(state, projectId)
  const strawberry = project.currentStrawBerry

  dispatch({
    type: ActionTypes.SET_STRAWBERRY,
    projectId,
    strawberry: {
      ...strawberry,
      running: false,
    },
  })

  return createNewStrawberry(project, strawberry)
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
    resetStrawberry: getResetStrawberry(dispatch, state),
    startStrawberry: getStartStrawberry(dispatch, state),
    pauseStrawberry: getPauseStrawberry(dispatch, state),
    finishStrawberry: getFinishStrawberry(dispatch, state),
  } as DataManagement

  return (
    <DataContext.Provider value={api}>{props.children}</DataContext.Provider>
  )
}

export default DataProvider
