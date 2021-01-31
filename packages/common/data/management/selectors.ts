import { Project } from '@app/data/interface'
import { State } from './state'

export const getProject = (state: State, projectId: String): Project => {
  return state.projects.list.find((project) => project.id === projectId)
}

export const getTime = (state: State, projectId: string): number =>
  state.time[projectId]
