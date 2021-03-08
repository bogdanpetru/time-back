import * as api from '@app/api'
import * as builders from '../builders'
import { State } from '../state'
import { getRemainingStrawberryTime } from '@app/data/utils'
import { ActionTypes, Action } from '../actions'

import * as selectors from '../selectors'

export const sync = (
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
    let newProject = project

    newProject = builders.updateGlobalProjectSatistics(newProject)

    let time = getRemainingStrawberryTime(project.currentStrawBerry)
    if (selectors.getTime(state, project.id) !== time) {
      if (time <= 0) {
        newProject = builders.createNextStrawberry(newProject)
        newProject = builders.updateStatisticsOnStrawberryFinish(
          newProject,
          project.currentStrawBerry
        )
        api.archiveStrawberry(project.id, project.currentStrawBerry)
        time = newProject.currentStrawBerry.size
      }

      dispatch({
        type: ActionTypes.UPATE_TIME,
        projectId: project.id,
        time,
      })
    }

    if (project !== newProject) {
      api.updateProject(newProject)

      dispatch({
        type: ActionTypes.EDIT_PROJECT,
        project: newProject,
      })
    }
  }
}

export default sync
