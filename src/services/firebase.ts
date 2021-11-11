// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore/'
import { connectAuthEmulator, getAuth } from 'firebase/auth/'

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
const app = initializeApp(firebaseConfig)

// Export Services
const firestore = getFirestore(app)
const auth = getAuth(app)

if (
  window.location.hostname === 'localhost' ||
  window.location.port === '3000'
) {
  connectFirestoreEmulator(firestore, 'localhost', 8080)
  connectAuthEmulator(auth, 'http://localhost:9099')
}

export { auth, app, firestore }
