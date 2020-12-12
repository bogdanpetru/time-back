import firebase from "firebase/app";
import 'firebase/auth';

class AuthService {
  user: any;
  config: any;

  constructor(config: any) {
    this.config = config;
  }
  
  init() {
    firebase.initializeApp(this.config);
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged(resolve);
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

  static of(config: any): AuthService {
    return new AuthService(config);
  }
}

export default AuthService;