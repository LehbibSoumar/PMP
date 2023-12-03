
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "*******",
  authDomain: "******",
  projectId: "******",
  storageBucket: "********",
  messagingSenderId: "******",
  appId: "******",
  measurementId: "********"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();