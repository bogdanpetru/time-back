import firebase from 'firebase/app'
import 'firebase/auth'

export const getUser = () => {
  return firebase.auth().currentUser
}
