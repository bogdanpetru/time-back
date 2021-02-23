import * as api from '@app/data/api'
import { Project, ProjectDescription } from '@app/data/interface'
import { mapProject } from '@app/data/map'
import { getRemainingStrawberryTime } from '@app/data/utils'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import * as selectors from '../selectors'

export const createProject = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => async (projectDetails: ProjectDescription) => {
  const savedProjectId = await api.createProject(void 0, projectDetails)
  const newProject = mapProject({
    ...projectDetails,
    currentStrawBerry: {
      size: projectDetails.strawberrySize,
    },
    id: savedProjectId,
  })
  dispatch({
    type: ActionTypes.ADD_PROJECT,
    project: newProject,
  })

  return newProject
}

export const updateProject = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => async (projectDescription: Project): Promise<Project> => {
  const state = getState()
  const project = selectors.getProject(state, projectDescription.id)
  const newProject = mapProject({
    ...project,
    ...projectDescription,
  })

  if (!project?.currentStrawBerry?.running) {
    newProject.currentStrawBerry = {
      ...newProject.currentStrawBerry,
      size: projectDescription.strawberrySize,
    }
  }

  dispatch({
    type: ActionTypes.EDIT_PROJECT,
    project: newProject,
  })

  await api.updateProject(newProject)
  return newProject
}

export const getDeleteProject = (dispatch: React.Dispatch<Action>) => (
  projectId: string
) => {
  dispatch({
    type: ActionTypes.DELETE_PROJECT,
    projectId,
  })

  return api.deleteProject(projectId)
}
