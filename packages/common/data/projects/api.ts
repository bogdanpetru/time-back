import firebase from 'firebase/app'
import 'firebase/firestore'
import { ProjectDescription, Project } from './interface'

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

export const getProject = async (projectId: string) => {
  const docRef = getProjectsRef()
  return (await docRef.doc(projectId).get()).data()
}

export const getAllProjects = async () => {
  return (await getProjectsRef().get()).docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }))
}
