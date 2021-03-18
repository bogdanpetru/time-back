import firebase from 'firebase/app'
import 'firebase/auth'

export const signOut = () => firebase.auth().signOut()

export const signInWithEmail = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const signUpWithEmail = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}

export const isUserSignedIn = (): boolean => !!firebase.auth().currentUser
