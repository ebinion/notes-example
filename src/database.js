// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth/'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC1B9wa4eFGKYX2syst-Mpwk825_4Lq_LU',
  authDomain: 'notes-7533e.firebaseapp.com',
  projectId: 'notes-7533e',
  storageBucket: 'notes-7533e.appspot.com',
  messagingSenderId: '762818292784',
  appId: '1:762818292784:web:e6452e2830437a65d311f5',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Export Services
export const firestore = getFirestore(app)
export const auth = getAuth(app)
