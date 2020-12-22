import firebase from 'firebase/app'
import 'firebase/firestore'
import { ProjectDescription, Project } from './interface'

const mapProject = (data: firebase.firestore.DocumentData): Project => ({
  id: data.id,
  name: data.name,
  strawberrySize: data.strawberrySize,
  breakSize: data.breakSize,
  description: data.description,
  numberOfStrawberries: data.numberOfStrawberries,
  strawberries: data.strawberries,
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
  await docRef.set(projectDetails, { merge: true })
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
