import {
  Project,
  StrawberryType,
  mapStrawberry,
  CurrentStrawBerry,
} from '@app/data/projects'
import { isSameDate } from '@app/utils'
import { getRemainingStrawberryTime } from './utils'

export const updateStawberryTime = (project: Project) => {
  let strawberry = project.currentStrawBerry
  if (!strawberry.running) {
    return project
  }

  const time = getRemainingStrawberryTime(strawberry)

  if (time < 0) {
    return project
  }

  return {
    ...project,
    currentStrawBerry: {
      ...strawberry,
      time,
    },
  }
}

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

  const newStrawberry = getNewIntervalStrawberry(project)

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

export const getNewIntervalStrawberry = (
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

export const creteNewStrawberryForProject = (project: Project): Project => {
  const isInterval =
    project.currentStrawBerry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL
  const newStrawberry =
    isInterval && project.breakSize
      ? getNewPauseStrawberry(project)
      : getNewIntervalStrawberry(project)

  return {
    ...project,
    currentStrawBerry: newStrawberry,
  }
}
