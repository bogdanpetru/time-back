import {
  Project,
  ProjectDescription,
  updateProject,
  createProject,
  deleteProject,
  mapProject,
} from '@app/data/projects'
import { State } from '../state'
import { ActionTypes, Action } from '../actions'
import * as selectors from '../selectors'

export const getCreateProject = (
  dispatch: React.Dispatch<Action>,
  state?: State
) => async (projectDetails: ProjectDescription) => {
  const savedProjectId = await createProject(void 0, projectDetails)
  const newProject = mapProject({
    ...projectDetails,
    currentStrawBerry: {
      size: projectDetails.strawberrySize,
    },
    id: savedProjectId,
  })
  dispatch({
    type: ActionTypes.SAVE_PROJECT,
    project: newProject,
  })

  return newProject
}

export const getUpdateProject = (
  dispatch: React.Dispatch<Action>,
  state: State
) => async (projectDescription: Project): Promise<Project> => {
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

  await updateProject(newProject)

  return newProject
}

export const getDeleteProject = (dispatch: React.Dispatch<Action>) => (
  projectId: string
) => {
  dispatch({
    type: ActionTypes.DELETE_PROJECT,
    projectId,
  })

  return deleteProject(projectId)
}
