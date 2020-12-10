import firebase from "firebase/app";
import 'firebase/auth';

setTimeout(() => {
  firebase.auth().onAuthStateChanged((...dd) => console.log('dude', ...dd));
}, 3000);

export function signInWithEmail(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signUpWithEmail(email: string, password: string) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function signInWithTwitter() {
  var provider = new firebase.auth.TwitterAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function signInWithFacebook() {
  var provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

export function signOut() {
  return firebase.auth().signOut();
}

export function isUserSignedIn() {
  // TODO 6: Return true if a user is signed-in.
  return !!firebase.auth().currentUser;
}