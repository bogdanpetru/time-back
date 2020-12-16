import firebase from "firebase/app";
import 'firebase/firestore';

import { ProjectDescription, Project } from './interface';

const getDb = () => {
  return firebase.firestore();
}

export const saveProject = async (
  { projectId = null, projectDetails} : 
  { projectId?: string, projectDetails: ProjectDescription }
) : Promise<any> => {
  const db = getDb();
  const user = firebase.auth().currentUser;

  const docRef = await db
    .collection('users')
    .doc(user.uid)
    .collection('projects')
    .doc(projectDetails.name);

  console.log(projectDetails.name);

  await docRef.set(projectDetails, { merge: true });
    

  console.log('docref', docRef);
};