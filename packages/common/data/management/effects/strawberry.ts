import { nowInSeconds, addArray, compose } from '@app/utils'
import * as api from '@app/data/api'
import { mapStrawberry } from '@app/data/map'
import { Project } from '@app/data/interface'
import { getRemainingStrawberryTime } from '@app/data/utils'
import * as builders from '../builders'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import * as selectors from '../selectors'

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

  return api.startStrawberry(projectId, startTime)
}

export const pauseStrawberry = (
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

  return api.pauseStrawberry(projectId, timeSpent)
}

export const finishStrawberry = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => async (projectId: string): Promise<void> => {
  const state = getState()
  const project = selectors.getProject(state, projectId)
  const oldStrawberry = project.currentStrawBerry
  const newProject = compose<Project>(
    builders.createNextStrawberry,
    (project) =>
      builders.updateStatisticsOnStrawberryFinish(project, oldStrawberry)
  )(project)

  dispatch({
    type: ActionTypes.EDIT_PROJECT,
    project: newProject,
  })

  await api.updateProject(newProject)
  await api.archiveStrawberry(project.id, oldStrawberry)
}
