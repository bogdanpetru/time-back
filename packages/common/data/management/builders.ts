import { Project, StrawberryType, mapStrawberry } from "@app/data/projects";


export const creteNewStrawberry = (project: Project): Project => {
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
    
    statistics = {
      ...project.statistics,
      today: {
        ...project.statistics.today,
        completedStrawberries: (project.statistics.today.completedStrawberries || 0) + 1
      },
      totalStrawberries: (project.statistics.totalStrawberries || 0) + 1
    }
  }

  const newStrawberry = mapStrawberry({
    size,
    type,
  })
  
  return {
    ...project,
    currentStrawBerry: newStrawberry,
    statistics
  }
}