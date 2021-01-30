import { getRemainingStrawberryTime } from '@app/data/utils'
import * as timeService from '@app/services/time'
import { Project } from '@app/data/interface'
import * as builders from '../builders'
import { ActionTypes, Action } from '../actions'
import { State } from '../state'
import { finishStrawberry } from './strawberry'

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
    finishStrawberry(dispatch, getState)(project.id)
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

const updateProjectTick = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => () => {
  const state = getState()
  const projects = state.projects.list
  for (const project of projects) {
    const preparedProject = builders.updateProjectSatistics(project)
    if (project !== preparedProject) {
      // updateProject(project)
      console.log(preparedProject)
    }
    moveStrawberryTime(project, dispatch, getState)
  }
}

export const startMonitoring = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => {
  timeService.subscribe(updateProjectTick(dispatch, getState))
}
