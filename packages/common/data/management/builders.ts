import { mapStrawberry } from '@app/data/map'
import { Project, StrawberryType, CurrentStrawBerry } from '@app/data/interface'
import { isSameDate } from '@app/utils'

export const updateStatisticsOnStrawberryFinish = (
  project: Project,
  currentStrawBerry: CurrentStrawBerry
): Project => {
  const isInterval =
    currentStrawBerry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL

  if (!isInterval) {
    return project
  }

  const statistics = {
    ...project.statistics,
    today: {
      ...project?.statistics?.today,
      date: project?.statistics?.today?.date || Date.now(),
      completedStrawberries:
        (project?.statistics?.today?.completedStrawberries || 0) + 1,
    },
    totalStrawberries: (project.statistics.totalStrawberries || 0) + 1,
  }

  return {
    ...project,
    statistics: statistics,
  }
}

export const updateGlobalProjectSatistics = (project: Project): Project => {
  if (project.currentStrawBerry.running) {
    return project
  }

  if (isSameDate(project.statistics.today.date, Date.now())) {
    return project
  }

  if (
    // and it has already reseted
    project.statistics.today.completedStrawberries === 0 &&
    // it has not been started today at all
    project.currentStrawBerry.startTime.length === 0
  ) {
    return project
  }

  const newStrawberry = getNewStrawberryInterval(project)
  return {
    ...project,
    currentStrawBerry: newStrawberry,
    statistics: {
      ...project?.statistics,
      today: {
        ...project?.statistics?.today,
        date: Date.now(),
        completedStrawberries: 0,
      },
    },
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
