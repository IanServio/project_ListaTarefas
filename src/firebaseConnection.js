import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBLQc7h5SMAZkuSdL5tOtMmZ61gAOMDq9I",
  authDomain: "cursoreact-6144a.firebaseapp.com",
  projectId: "cursoreact-6144a",
  storageBucket: "cursoreact-6144a.firebasestorage.app",
  messagingSenderId: "478854323468",
  appId: "1:478854323468:web:1b55e90358a7e10ed43d29",
  measurementId: "G-6HJLWCR5K2"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };