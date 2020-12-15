import firebase from "firebase/app";
import 'firebase/firestore';

import { ProjectDescription, Project } from './interface';

const getDb = () => {
  return firebase.firestore();
}

interface CreateProject {
  projectId?: string;
  projectDetails: ProjectDescription;
}

export const createProject = async ({
  projectId = null,
  projectDetails
}: CreateProject) : Promise<any> => {
  const db = getDb();
  const user = firebase.auth().currentUser;

  console.log(projectDetails);

  const docRef = await db
    .collection('users')
    .doc(user.uid)
    .collection('projects')
    .doc(projectId || undefined)
    .set({
      projectDetails
    });

  console.log(docRef);
};