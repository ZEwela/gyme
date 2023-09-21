import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB0BuzrSQCRdfbZpqM64onnMZe0v59e-RQ",
  authDomain: "gyme-38c52.firebaseapp.com",
  databaseURL:
    "https://gyme-38c52-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gyme-38c52",
  storageBucket: "gyme-38c52.appspot.com",
  messagingSenderId: "954315959322",
  appId: "1:954315959322:web:4ef5c05865cbce8c6c35a3",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { ref, onValue, db };
