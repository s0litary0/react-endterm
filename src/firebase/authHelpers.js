import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
  return signOut(auth)
}

export async function createUserProfile(user) {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    favourites: [],
    photoURL: ""
  });
}