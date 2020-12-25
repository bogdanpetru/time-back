import firebase from 'firebase/app'
import 'firebase/firestore'
import { ProjectDescription, Project, Strawberry } from './interface'

const mapStrawberry = (data: firebase.firestore.DocumentData): Strawberry => ({
  id: data.id,
  size: parseInt(data.size, 10) * 1000 * 60,
  name: data.name,
  timeSpent: data.timeSpent || [],
  startTime: data.startTime || [],
  running: Boolean(data.running),
  notes: data.notes,
  finished: data.finished,
})

const mapProject = (data: firebase.firestore.DocumentData): Project => ({
  id: data.id,
  name: data.name,
  strawberrySize: data.strawberrySize,
  breakSize: data.breakSize,
  description: data.description,
  numberOfStrawberries: data.numberOfStrawberries,
  strawberries: data.strawberries,
  currentStrawBerry: mapStrawberry(data.currentStrawBerry || {}),
})

const getDb = () => {
  return firebase.firestore()
}

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

  let editOrSaveSpecificData = null
  if (projectId) {
    editOrSaveSpecificData = {
      'currentStrawBerry.size': projectDetails.strawberrySize,
    }
  } else {
    editOrSaveSpecificData = {
      currentStrawBerry: {
        size: projectDetails.strawberrySize,
      },
    }
  }

  await docRef.set(
    {
      name: projectDetails.name,
      strawberrySize: projectDetails.strawberrySize,
      numberOfStrawberries: projectDetails.numberOfStrawberries,
      breakSize: projectDetails.breakSize,
      description: projectDetails.description,
      ...editOrSaveSpecificData,
    },
    { merge: true }
  )
  return docRef.id
}

export const getProject = async (projectId: string): Promise<Project> => {
  const docRef = getProjectsRef()
  const project = (await docRef.doc(projectId).get()).data()

  if (!project) {
    throw new Error(`Could not find project with id ${projectId}`)
  }

  return mapProject(project)
}

export const getAllProjects = async (): Promise<Project[]> => {
  return (await getProjectsRef().get()).docs.map((item) =>
    mapProject({
      id: item.id,
      ...item.data(),
    })
  )
}

export const getStrawberry = async (projectId: string): Promise<Strawberry> => {
  const project = await getProject(projectId)

  return mapStrawberry(project.currentStrawBerry)
}

export const startStrawberry = async (
  projectId: string,
  startTime: number
): Promise<number> => {
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
