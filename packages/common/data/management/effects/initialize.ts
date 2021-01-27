import {
  Project,
  getProjects,
  updateProject,
  archiveStrawberry,
} from '@app/data/projects'
import * as timeService from '@app/services/time'
import * as builders from '../builders'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'

import { compose } from '@app/utils'

export const keepProjectsUpToDate = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => () => {
  const state = getState()
  const projects = state.projects.list
  for (const project of projects) {
    /**
     * 1. update time
     * 2. check if strawberry ended
     *  2.1 reset current-strawberry
     *  2.2 update statistics
     *  2.3 archive old strawberry
     *
     * 3. check if we should reset daily counter
     */

    let newProject = builders.updateStawberryTime(project)
    if (newProject !== project && newProject.currentStrawBerry.time <= 0) {
      const oldStrawberry = project.currentStrawBerry

      newProject = compose<Project>(
        builders.creteNewStrawberryForProject,
        (project) =>
          builders.updateStatisticsOnStrawberryFinish(project, oldStrawberry)
      )(project)

      // TODO: async !
      archiveStrawberry(project.id, oldStrawberry)
    }

    newProject = builders.updateGlobalProjectSatistics(newProject)

    if (project !== newProject) {
      // TODO async !
      // updateProject(newProject)
    }
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

  timeService.subscribe(keepProjectsUpToDate(dispatch, getState))

  return projects
}
