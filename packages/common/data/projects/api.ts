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
  projectId = null,
  projectDetails,
}: {
  projectId?: string
  projectDetails: ProjectDescription
}): Promise<string> => {
  const docRef = getProjectsRef().doc(projectDetails.name)
  await docRef.set(projectDetails, { merge: true })
  return docRef.id
}

export const getProject = async (id: string) => {
  const docRef = getProjectsRef()
  return await docRef.doc(id).get()
}
