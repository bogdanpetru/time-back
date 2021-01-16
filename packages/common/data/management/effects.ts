import { nowInSeconds, addArray, compose } from '@app/utils'
import {
  Project,
  ProjectDescription,
  mapStrawberry,
  setCurrentStrawberry,
  startStrawberry,
  pauseStrawberry,
  getProjects,
  createNewStrawberry,
  saveProject,
  deleteProject,
  archiveStrawberry,
} from '@app/data/projects'
import * as builders from './builders'
import { State } from './state'
import { ActionTypes, Action } from './actions'
import { getRemainingStrawberryTime } from './utils'

const getProjectSelector = (state: State, projectId: String): Project =>
  state.projects.list.find((project) => project.id === projectId)

export const getLoadProjects = (
  dispatch: React.Dispatch<Action>,
  state: State
) => async (): Promise<Project[]> => {
  if (state.projects.list?.length) {
    return []
  }

  const projects = await getProjects()

  dispatch({
    type: ActionTypes.SET_PROJECTS,
    projects,
  })

  return projects
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
  const newProject = compose(
    builders.creteNewStrawberryForProject,
    builders.updateStatistics
  )(project)

  dispatch({
    type: ActionTypes.EDIT_PROJECT,
    project: newProject,
  })

  await createNewStrawberry(newProject)
  await archiveStrawberry(project.id, oldStrawberry)
}

export const getSaveProject = (
  dispatch: React.Dispatch<Action>,
  state: State
) => async (
  projectId: string,
  projectDetails: ProjectDescription
): Promise<string> => {
  let project = null

  let savedProjectId = projectId

  if (projectId) {
    const project = getProjectSelector(state, projectId)
    const newProject = {
      ...project,
      ...projectDetails,
    }

    if (!project?.currentStrawBerry?.running) {
      newProject.currentStrawBerry = {
        ...newProject.currentStrawBerry,
        size: projectDetails.strawberrySize,
      }
    }

    dispatch({
      type: ActionTypes.EDIT_PROJECT,
      project: newProject,
    })
    return saveProject(projectId, newProject)
  } else {
    const savedProjectId = await saveProject(void 0, projectDetails)
    const newProject = {
      ...projectDetails,
      currentStrawBerry: {
        size: projectDetails.strawberrySize,
      },
      id: savedProjectId,
    }
    dispatch({
      type: ActionTypes.SAVE_PROJECT,
      project: newProject,
    })
    return savedProjectId
  }
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
