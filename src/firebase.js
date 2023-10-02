import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDowkTfA0xQmKoZjphYxgPTD6RvQWW8mUk",
  authDomain: "todolist-a5eb5.firebaseapp.com",
  databaseURL: "https://todolist-a5eb5-default-rtdb.firebaseio.com",
  projectId: "todolist-a5eb5",
  storageBucket: "todolist-a5eb5.appspot.com",
  messagingSenderId: "165404093915",
  appId: "1:165404093915:web:3ee02d8968464cc9c40bfe",
  measurementId: "G-JEG72WJLRF",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
