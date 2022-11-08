import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getFirestore,
} from "firebase/firestore";

// Initialize Firebase
initializeApp({
  apiKey: "AIzaSyDXtxnPhrgwMPD6gwr7NXmRwwWN9x8gST4",
  authDomain: "fir-b6d53.firebaseapp.com",
  projectId: "fir-b6d53",
  storageBucket: "fir-b6d53.appspot.com",
  messagingSenderId: "941082280765",
  appId: "1:941082280765:web:122bdea4574c3c45cc7b54",
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
  onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Reviews collection
export type Todo = {
  by: string;
  text: string;
};

export const todosCollection = collection(
  db,
  "todos"
) as CollectionReference<Todo>;

export const todosDocument = (id: string) =>
  doc(db, "todos", id) as DocumentReference<Todo>;
