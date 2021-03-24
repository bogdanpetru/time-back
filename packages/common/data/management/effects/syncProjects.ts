import * as api from '@app/api'
import * as builders from '../builders'
import { State } from '../state'
import { getRemainingStrawberryTime } from '@app/data/utils'
import strawberryImg from '@app/assets/strawberry-square.png'
import { addNotification } from '@app/services/notification'
import { ActionTypes, Action } from '../actions'
import * as selectors from '../selectors'
import { StrawberryType } from '../../interface'

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

    let time = getRemainingStrawberryTime(project.currentStrawberry)
    if (selectors.getTime(state, project.id) !== time) {
      if (time <= 0) {
        newProject = builders.createNextStrawberry(newProject)
        newProject = builders.updateStatisticsOnStrawberryFinish(
          newProject,
          project.currentStrawberry
        )
        api.archiveStrawberry(project.id, project.currentStrawberry)
        time = newProject.currentStrawberry.size

        if (
          project?.currentStrawberry?.type ===
          StrawberryType.STRAWBERRY_TYPE_INTERVAL
        ) {
          addNotification('Strawberry finished, take a break', {
            img: strawberryImg,
          })
        } else {
          addNotification('Break finished, back to work 😊', {
            img: strawberryImg,
          })
        }
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
