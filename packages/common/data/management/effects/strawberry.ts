import { nowInSeconds, addArray, compose } from '@app/utils'
import * as api from '@app/data/api'
import { mapStrawberry } from '@app/data/map'
import * as builders from '../builders'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import * as selectors from '../selectors'
import { CurrentStrawBerry } from '../../interface'

export const resetStrawberry = (
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

  return api.setCurrentStrawberry(project.id, strawberry)
}

export const startStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => (projectId: string): Promise<CurrentStrawBerry> => {
  const state = getState()
  const startTime = nowInSeconds()
  const project = selectors.getProject(state, projectId)
  let today = null

  const strawberry = {
    ...project.currentStrawBerry,
    running: true,
    startTime: [...(project.currentStrawBerry?.startTime || []), startTime],
  }

  dispatch({
    type: ActionTypes.START_STRAWBERRY,
    projectId,
    strawberry,
    today,
  })

  return api.setCurrentStrawberry(projectId, strawberry)
}

export const pauseStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => (projectId: string): Promise<CurrentStrawBerry> => {
  const state = getState()
  const project = selectors.getProject(state, projectId)
  let newStrawberry = project.currentStrawBerry

  let time = selectors.getTime(state, project.id)
  const timeSpent =
    newStrawberry.size -
    time -
    (newStrawberry?.timeSpent ? addArray(newStrawberry.timeSpent) : 0)

  newStrawberry = {
    ...newStrawberry,
    running: false,
    timeSpent: [...newStrawberry.timeSpent, timeSpent],
  }

  dispatch({
    type: ActionTypes.SET_STRAWBERRY,
    projectId,
    strawberry: newStrawberry,
  })

  return api.setCurrentStrawberry(projectId, newStrawberry)
}

export const finishStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => async (projectId: string): Promise<void> => {
  const state = getState()
  const project = selectors.getProject(state, projectId)
  const oldStrawberry = project.currentStrawBerry
  let newProject = builders.createNextStrawberry(project)
  newProject = builders.updateStatisticsOnStrawberryFinish(
    newProject,
    oldStrawberry
  )

  dispatch({
    type: ActionTypes.EDIT_PROJECT,
    project: newProject,
  })

  await api.updateProject(newProject)
  await api.archiveStrawberry(project.id, oldStrawberry)
}
