import {
  Project,
  StrawberryType,
  mapStrawberry,
  CurrentStrawBerry,
} from '@app/data/projects'
import { isSameDate } from '@app/utils'

export const updateStatistics = (
  project: Project,
  currentStrawBerry: CurrentStrawBerry
): Project => {
  const isInterval =
    currentStrawBerry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL
  let statistics = project.statistics

  if (isInterval) {
    statistics = {
      ...statistics,
      today: {
        ...project?.statistics?.today,
        completedStrawberries:
          (project?.statistics?.today?.completedStrawberries || 0) + 1,
      },
      totalStrawberries: (project.statistics.totalStrawberries || 0) + 1,
    }
  }

  return {
    ...project,
    statistics: statistics,
  }
}

export const creteNewStrawberryForProject = (project: Project): Project => {
  const strawberry = project.currentStrawBerry

  let type = StrawberryType.STRAWBERRY_TYPE_INTERVAL
  let size = project.strawberrySize
  let statistics = project.statistics

  const isInterval = strawberry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL

  /**
   * when an interval is finished:
   * - statistics are updated
   * - strawberry is archived
   * - current strawberry changes to pause
   */
  if (isInterval) {
    if (project.breakSize) {
      type = StrawberryType.STRAWBERRY_TYPE_PAUSE
      size = project.breakSize
    }
  }

  const newStrawberry = mapStrawberry({
    size,
    type,
  })

  return {
    ...project,
    currentStrawBerry: newStrawberry,
    statistics,
  }
}

export const checkInitialStatistics = (projects: Project[]) => {
  const checkStatistics = (project: Project): Project => {
    if (isSameDate(project.currentStrawBerry.startTime[0], Date.now())) {
      return project
    }

    if (project.currentStrawBerry.running) {
      return project
    }

    // TODO: check if the last goal is done and update statistics
    return {
      ...project,
      statistics: {
        ...project?.statistics,
        today: {
          ...project?.statistics?.today,
          completedStrawberries: 0,
        },
      },
    }
  }

  // check if we have stale strawberries
  // strawberry.startTime[0] < today ts
  // and it is not running
  let preparedProjects = []
  let projectsToUpdate = []
  for (const project of projects) {
    const preparedProject = checkStatistics(project)
    if (project !== preparedProject) {
      projectsToUpdate.push(preparedProject)
    }
    preparedProjects.push(preparedProject)
  }

  return {
    preparedProjects,
    projectsToUpdate,
  }
}
