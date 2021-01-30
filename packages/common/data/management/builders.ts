import { mapStrawberry } from '@app/data/map'
import { Project, StrawberryType, CurrentStrawBerry } from '@app/data/interface'
import { isSameDate } from '@app/utils'

export const updateStatisticsOnStrawberryFinish = (
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

export const getNewStrawberryInterval = (
  project: Project
): CurrentStrawBerry => {
  const type = StrawberryType.STRAWBERRY_TYPE_INTERVAL
  const size = project.strawberrySize

  return mapStrawberry({
    size,
    type,
  })
}

const getNewPauseStrawberry = (project: Project): CurrentStrawBerry => {
  const type = StrawberryType.STRAWBERRY_TYPE_PAUSE
  const size = project.breakSize

  return mapStrawberry({
    size,
    type,
  })
}

export const updateGlobalProjectSatistics = (project: Project): Project => {
  if (project.currentStrawBerry.running) {
    return project
  }

  if (isSameDate(project.currentStrawBerry.startTime[0], Date.now())) {
    return project
  }

  // check if we have something to update
  if (
    // and it has already reseted
    project.statistics.today.completedStrawberries === 0 &&
    // it has not been started today at all
    project.currentStrawBerry.startTime.length === 0
  ) {
    return project
  }

  const newStrawberry = getNewStrawberryInterval(project)

  // TODO: check if the last goal is done and update statistics
  return {
    ...project,
    currentStrawBerry: newStrawberry,
    statistics: {
      ...project?.statistics,
      today: {
        ...project?.statistics?.today,
        completedStrawberries: 0,
      },
    },
  }
}

/**
 * Creats a new strawberry when one finished
 *
 * @param project updated project
 */
export const createNextStrawberry = (project: Project): Project => {
  const isInterval =
    project.currentStrawBerry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL
  const newStrawberry =
    isInterval && project.breakSize
      ? getNewPauseStrawberry(project)
      : getNewStrawberryInterval(project)

  return {
    ...project,
    currentStrawBerry: newStrawberry,
  }
}
