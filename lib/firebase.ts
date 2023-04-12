// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIRHbU_yxjzmm0-ch2eDDWLM0RjRRMjsc",
  authDomain: "ap-helper-41845.firebaseapp.com",
  projectId: "ap-helper-41845",
  storageBucket: "ap-helper-41845.appspot.com",
  messagingSenderId: "616420924741",
  appId: "1:616420924741:web:ad8b8ab64c0caa5a22b22c",
  measurementId: "G-DCRQGF9PBR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const storage = getStorage(app);

export const STATE_CHANGED = "state_changed";

export async function getAllTopics() {
  const q = query(collection(firestore, "areas"));

  return (await getDocs(q)).docs;
}
