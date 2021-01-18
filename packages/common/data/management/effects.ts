import { nowInSeconds, addArray, compose } from '@app/utils'
import {
  Project,
  ProjectDescription,
  mapStrawberry,
  setCurrentStrawberry,
  startStrawberry,
  pauseStrawberry,
  getProjects,
  updateProject,
  createProject,
  deleteProject,
  archiveStrawberry,
  mapProject,
} from '@app/data/projects'
import * as builders from './builders'
import { State } from './state'
import { ActionTypes, Action } from './actions'
import { getRemainingStrawberryTime } from './utils'

/**
 * TODO:
 * - so everything works ok when network is ok and firebase is up and running
 * - what happens when something fails?
 *  - implement a way to retry
 *  - while offline, or failed requests should accumulate
 *  - maybe mark data that has been updated? is dirty
 */

const getProjectSelector = (state: State, projectId: String): Project =>
  state.projects.list.find((project) => project.id === projectId)

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
  const project = getProjectSelector(state, projectId)
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
  const project = getProjectSelector(state, projectId)

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
  const project = getProjectSelector(state, projectId)
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
  const project = getProjectSelector(state, projectId)
  const oldStrawberry = project.currentStrawBerry
  const newProject = compose(builders.creteNewStrawberryForProject, (project) =>
    builders.updateStatistics(project, oldStrawberry)
  )(project)

  dispatch({
    type: ActionTypes.EDIT_PROJECT,
    project: newProject,
  })

  await updateProject(newProject)
  await archiveStrawberry(project.id, oldStrawberry)
}

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
  const project = getProjectSelector(state, projectDescription.id)
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
