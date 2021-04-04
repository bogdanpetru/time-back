import { mapStrawberry } from '@app/data/map'
import { Project, StrawberryType, CurrentStrawberry } from '@app/data/interface'
import { isSameDate } from '@app/utils'

export const updateStatisticsOnStrawberryFinish = (
  project: Project,
  currentStrawberry: CurrentStrawberry
): Project => {
  const isInterval =
    currentStrawberry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL

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

  if (statistics.today.completedStrawberries === project.numberOfStrawberries) {
    statistics.numberOfDailyCompletedGoals =
      (statistics?.numberOfDailyCompletedGoals || 0) + 1
  }

  return {
    ...project,
    statistics,
  }
}

export const updateGlobalProjectSatistics = (project: Project): Project => {
  if (project.currentStrawberry.running) {
    return project
  }

  if (isSameDate(project.statistics.today.date, Date.now())) {
    return project
  }

  if (!project?.statistics?.today?.date) {
    // if it does not have a date, the project is new and no strawberry was complete
    // if this is the case if this is paused until tomorrow it should be reset
    return {
      ...project,
      statistics: {
        ...project.statistics,
        today: {
          ...project.statistics.today,
          date: Date.now(),
        },
      },
    }
  }

  if (
    // and it has already reseted
    project.statistics.today.completedStrawberries === 0 &&
    // it has not been started today at all
    project.currentStrawberry.startTime.length === 0
  ) {
    return project
  }

  const newStrawberry = getNewStrawberryInterval(project)
  return {
    ...project,
    currentStrawberry: newStrawberry,
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
): CurrentStrawberry => {
  const type = StrawberryType.STRAWBERRY_TYPE_INTERVAL
  const size = project.strawberrySize

  return mapStrawberry({
    size,
    type,
  })
}

const getNewPauseStrawberry = (project: Project): CurrentStrawberry => {
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
    project.currentStrawberry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL
  const newStrawberry =
    isInterval && project.breakSize
      ? getNewPauseStrawberry(project)
      : getNewStrawberryInterval(project)

  return {
    ...project,
    currentStrawberry: newStrawberry,
  }
}
