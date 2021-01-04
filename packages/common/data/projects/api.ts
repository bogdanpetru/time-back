import firebase from 'firebase/app'
import 'firebase/firestore'
import invariant from 'invariant'

import {
  ProjectDescription,
  Project,
  Strawberry,
  StrawberryType,
} from '../interface'
import { mapProject, mapStrawberry } from './map'

const getDb = () => firebase.firestore()

export const getProjectsRef = () => {
  const db = getDb()
  const user = firebase.auth().currentUser
  return db.collection('users').doc(user.uid).collection('projects')
}

export const saveProject = async ({
  projectId,
  projectDetails,
}: {
  projectId?: string
  projectDetails: ProjectDescription
}): Promise<string> => {
  const docRef = getProjectsRef().doc(projectId)

  const commonData = {
    name: projectDetails.name,
    strawberrySize: projectDetails.strawberrySize,
    numberOfStrawberries: projectDetails.numberOfStrawberries,
    breakSize: projectDetails.breakSize,
    description: projectDetails.description,
  }

  if (projectId) {
    await docRef.update({
      ...commonData,

      'currentStrawBerry.size': projectDetails.strawberrySize,
    })
  } else {
    await docRef.set(
      {
        ...commonData,
        currentStrawBerry: {
          size: projectDetails.strawberrySize,
        },
      },
      { merge: true }
    )
  }

  return docRef.id
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

export const resetStrawberry = async (project: Project) => {
  const newStrawberry = mapStrawberry({
    size: project.strawberrySize,
  })

  const projectRef = getProjectsRef().doc(project.id)
  await projectRef.set(
    {
      currentStrawBerry: newStrawberry,
    },
    { merge: true }
  )

  return newStrawberry
}

const archiveStrawberry = async (projectId: string, strawberry: Strawberry) =>
  getProjectsRef()
    .doc(projectId)
    .collection('strawberries')
    .doc()
    .set(strawberry)

export const createNewStrawberry = async (
  project: Project,
  strawberry: Strawberry
) => {
  let type = StrawberryType.STRAWBERRY_TYPE_INTERVAL
  let size = project.strawberrySize
  let statistics = null
  const isInterval =
    project.breakSize &&
    strawberry.type === StrawberryType.STRAWBERRY_TYPE_INTERVAL
  if (isInterval) {
    type = StrawberryType.STRAWBERRY_TYPE_PAUSE
    size = project.breakSize
    statistics = {
      'statistics.totalStrawberries': firebase.firestore.FieldValue.increment(
        1
      ),
    }
  }

  const newStrawberry = mapStrawberry({
    size,
    type,
  })

  const projectRef = getProjectsRef().doc(project.id)
  await projectRef.set(
    {
      currentStrawBerry: newStrawberry,
      ...statistics,
    },
    { merge: true }
  )
  await archiveStrawberry(project.id, strawberry)

  return newStrawberry
}

export const startStrawberry = async (
  projectId: string,
  startTime: number
): Promise<number> => {
  invariant(projectId, 'cannot start a interval without a project-id')

  await getProjectsRef()
    .doc(projectId)
    .set(
      {
        currentStrawBerry: {
          running: true,
          startTime: firebase.firestore.FieldValue.arrayUnion(startTime),
        },
      },
      { merge: true }
    )

  return startTime
}

export const pauseStrawberry = async (projectId: string, timeSpent: number) => {
  invariant(projectId, 'cannot start a interval without a project-id')

  await getProjectsRef()
    .doc(projectId)
    .set(
      {
        currentStrawBerry: {
          running: false,
          timeSpent: firebase.firestore.FieldValue.arrayUnion(timeSpent),
        },
      },
      { merge: true }
    )
}
