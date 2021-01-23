import {
  Project,
  getProjects,
  updateProject,
  CurrentStrawBerry,
} from '@app/data/projects'
import * as timeService from '@app/services/time'
import * as builders from '../builders'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import { getRemainingStrawberryTime } from '../utils'
import { getFinishStrawberry } from './strawberry'

const moveStrawberryTime = (
  project: Project,
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => {
  let strawberry = project.currentStrawBerry
  if (!strawberry.running) {
    return
  }
  const time = getRemainingStrawberryTime(strawberry)
  if (time <= 0) {
    getFinishStrawberry(dispatch, getState)(project.id)
    return
  }

  dispatch({
    type: ActionTypes.SET_STRAWBERRY,
    projectId: project.id,
    strawberry: {
      ...strawberry,
      time,
    },
  })
}

export const updateProjectTick = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => () => {
  const state = getState()
  const projects = state.projects.list
  for (const project of projects) {
    const preparedProject = builders.updateProjectSatistics(project)
    if (project !== preparedProject) {
      updateProject(project)
    }
    moveStrawberryTime(project, dispatch, getState)
  }
}

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
  getState: () => State
) => async (): Promise<Project[]> => {
  const state = getState()
  if (state.projects.list?.length) {
    return []
  }

  const projects = await getProjects()

  dispatch({
    type: ActionTypes.SET_PROJECTS,
    projects: projects,
  })

  timeService.subscribe(updateProjectTick(dispatch, getState))

  return projects
}
