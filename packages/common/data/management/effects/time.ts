import { Project } from '../../interface'
import { getRemainingStrawberryTime } from '../../utils'
import { Action, ActionTypes } from '../actions'

export const intializeTime = (
  dispatch: React.Dispatch<Action>,
  projects: Project[]
): void => {
  const time = projects.reduce((acc, project) => {
    acc[project.id] = getRemainingStrawberryTime(project.currentStrawberry)
    return acc
  }, {} as { [key: string]: number })

  dispatch({
    type: ActionTypes.SET_INITIAL_TIME,
    time,
  })
}
