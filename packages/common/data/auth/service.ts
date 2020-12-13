import firebase from "firebase/app";
import 'firebase/auth';

export interface AuthConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
class AuthService {
  user: any;
  config: any;

  constructor(config: AuthConfig) {
    this.config = config;
  }
  
  init() {
    firebase.initializeApp(this.config);
    return new Promise((resolve) => {

      // TODO: find a better place to do this
      firebase.auth().onAuthStateChanged(resolve);

      return this;
    });
  }

  signOut() {
    return firebase.auth().signOut();
  }
  
  signInWithEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  signUpWithEmail(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  
  
  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }
  
  
  isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  static of(config: AuthConfig): AuthService {
    return new AuthService(config);
  }
}

export default AuthService;