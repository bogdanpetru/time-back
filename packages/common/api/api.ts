import firebase from 'firebase/app'
import 'firebase/firestore'

import {
  ProjectDescription,
  Project,
  CurrentStrawberry,
} from '@app/data/interface'

import { mapProject } from '@app/data/map'

const getDb = () => firebase.firestore()

export const getProjectsRef = () => {
  const db = getDb()
  const user = firebase.auth().currentUser

  if (!user) {
    throw new Error('user not logged in')
  }

  return db.collection('users').doc(user?.uid).collection('projects')
}

export const createProject = async (
  projectDetails?: ProjectDescription
): Promise<string> => {
  const docRef = getProjectsRef().doc()
  await docRef.set(projectDetails)
  return docRef.id
}

export const updateProject = (project: Project): Promise<void> => {
  const projectRef = getProjectsRef().doc(project.id)
  return projectRef.update(project)
}

export const deleteProject = (projectId: string) =>
  getProjectsRef().doc(projectId).delete()

export const getProject = async (projectId: string): Promise<Project> => {
  const docRef = getProjectsRef()
  const project = (await docRef.doc(projectId).get()).data()

  if (!project) {
    throw new Error(`Could not find project with id ${projectId}`)
  }

  return mapProject({ ...project, id: projectId })
}

export const getProjects = async (): Promise<Project[]> => {
  return (await getProjectsRef().get()).docs.map((item) =>
    mapProject({
      id: item.id,
      ...item.data(),
    })
  )
}

export const listenToProjectUpdates = (
  subscriber: (data: { type: string; project: Project }) => void
) => {
  getProjectsRef().onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      const project = mapProject(change.doc.data())

      subscriber({
        type: change.type,
        project,
      })
    })
  })
}

export const setCurrentStrawberry = async (
  projectId: string,
  strawberry: CurrentStrawberry
) => {
  const projectRef = getProjectsRef().doc(projectId)
  await projectRef.update({
    currentStrawberry: strawberry,
  })

  return strawberry
}

export const archiveStrawberry = async (
  projectId: string,
  strawberry: CurrentStrawberry
) =>
  getProjectsRef()
    .doc(projectId)
    .collection('strawberries')
    .doc()
    .set(strawberry)
