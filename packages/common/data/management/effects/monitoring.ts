import * as api from '@app/api'
import * as timeService from '@app/services/time'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import syncProjects from './syncProjects'

import * as selectors from '../selectors'

export const startMonitoring = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => {
  syncProjects(dispatch, getState) // start by updating
  timeService.subscribe(syncProjects(dispatch, getState))
}

export const keepProjectsUpdated = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => {
  api.listenToProjectUpdates(({ project, type }) => {
    switch (type) {
      case 'added':
        const isNew = !selectors.getProject(getState(), project?.id)
        if (project?.id && isNew) {
          dispatch({
            type: ActionTypes.ADD_PROJECT,
            project,
          })
        }
        break
      case 'modified':
        dispatch({
          type: ActionTypes.EDIT_PROJECT,
          project,
        })
        break
      case 'removed':
        dispatch({
          type: ActionTypes.DELETE_PROJECT,
          projectId: project.id,
        })
        break
    }
  })
}
