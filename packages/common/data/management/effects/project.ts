import * as api from '@app/api'
import { Project, ProjectDescription } from '@app/data/interface'
import { mapProject } from '@app/data/map'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import * as selectors from '../selectors'

export const createProject = (
  dispatch: React.Dispatch<Action>,
  getState: () => State
) => async (projectDetails: ProjectDescription) => {
  const savedProjectId = await api.createProject(projectDetails)
  const newProject = mapProject({
    ...projectDetails,
    currentStrawberry: {
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

  if (!project?.currentStrawberry?.running) {
    newProject.currentStrawberry = {
      ...newProject.currentStrawberry,
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
