import { Project } from '@app/data/projects'
import { State } from './state'

export function getProject(state: State, projectId: String): Project {
  return state.projects.list.find((project) => project.id === projectId)
}
