import firebase from "firebase/app";
import 'firebase/auth';

export function auth() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
