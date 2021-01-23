import { nowInSeconds, addArray, compose } from '@app/utils'
import {
  Project,
  mapStrawberry,
  setCurrentStrawberry,
  startStrawberry,
  pauseStrawberry,
  getProjects,
  updateProject,
  archiveStrawberry,
} from '@app/data/projects'
import * as builders from '../builders'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import { getRemainingStrawberryTime } from '../utils'
import * as selectors from '../selectors'

/**
 * TODO:
 * - so everything works ok when network is ok and firebase is up and running
 * - what happens when something fails?
 *  - implement a way to retry
 *  - while offline, or failed requests should accumulate
 *  - maybe mark data that has been updated? is dirty
 */

export const getInitializeData = (
  dispatch: React.Dispatch<Action>,
  state: State
) => async (): Promise<Project[]> => {
  if (state.projects.list?.length) {
    return []
  }

  const projects = await getProjects()

  /**
   * Check if statistics should be updated:
   * - statistics for yersterday should be reset
   * - TODO: if there was a running interval that completed, check if the goal was
   * fulfilled, if so update statistics and reset
   */
  const {
    preparedProjects,
    projectsToUpdate,
  } = builders.checkInitialStatistics(projects)

  dispatch({
    type: ActionTypes.SET_PROJECTS,
    projects: preparedProjects,
  })

  if (projectsToUpdate.length) {
    let promises = []
    for (const project of projectsToUpdate) {
      promises.push(updateProject(project))
    }
    await Promise.all(promises)
  }

  return preparedProjects
}

export const getResetStrawberry = (
  dispatch: React.Dispatch<Action>,
  state: State
) => (projectId: string) => {
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
  state: State
) => (projectId: string): Promise<void> => {
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
  state: State
) => (projectId: string): Promise<void> => {
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
  state: State
) => async (projectId: string): Promise<void> => {
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
