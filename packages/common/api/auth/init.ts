import firebase from 'firebase/app'
import 'firebase/auth'

export interface AuthConfig {
  apiKey: string
  authDomain: string
  // databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

const init = (config: AuthConfig) => {
  firebase.initializeApp(config)
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(resolve)
  })
}

export default init
