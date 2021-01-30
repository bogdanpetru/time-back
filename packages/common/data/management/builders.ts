import { mapStrawberry } from '@app/data/map'
import { Project, StrawberryType, CurrentStrawBerry } from '@app/data/interface'
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

export const updateProjectSatistics = (project: Project): Project => {
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
