import { nowInSeconds, addArray, compose } from '@app/utils'
import {
  Project,
  mapStrawberry,
  setCurrentStrawberry,
  startStrawberry,
  pauseStrawberry,
  updateProject,
  archiveStrawberry,
} from '@app/data/projects'
import * as builders from '../builders'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import { getRemainingStrawberryTime } from '../utils'
import * as selectors from '../selectors'

export const getResetStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => (projectId: string) => {
  const state = getState()
  const project = selectors.getProject(state, projectId)
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

export const getStartStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => (projectId: string): Promise<void> => {
  const state = getState()
  const startTime = nowInSeconds()
  const project = selectors.getProject(state, projectId)

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

export const getPauseStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => (projectId: string): Promise<void> => {
  const state = getState()
  const project = selectors.getProject(state, projectId)
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

export const getFinishStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => async (projectId: string): Promise<void> => {
  const state = getState()
  const project = selectors.getProject(state, projectId)
  const oldStrawberry = project.currentStrawBerry
  const newProject = compose<Project>(
    builders.creteNewStrawberryForProject,
    (project) => builders.updateStatistics(project, oldStrawberry)
  )(project)

  dispatch({
    type: ActionTypes.EDIT_PROJECT,
    project: newProject,
  })

  await updateProject(newProject)
  await archiveStrawberry(project.id, oldStrawberry)
}
