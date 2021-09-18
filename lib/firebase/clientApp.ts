import FirebaseApp from 'firebase/app'
// import 'firebase/auth' // If you need it
// import 'firebase/firestore' // If you need it
// import 'firebase/storage' // If you need it
import 'firebase/analytics' // If you need it
import 'firebase/performance' // If you need it

const clientCredentials = {
  apiKey: "AIzaSyAWpMWvadtppkPPkaWogSJdGo3z1607oqE", // process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "kelas-unkriswina-5124a.firebaseapp.com", // process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: '', // process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: "kelas-unkriswina-5124a", // process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "kelas-unkriswina-5124a.appspot.com", // process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "426942709006", // process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: "1:426942709006:web:a823ba3ddc1b49b73f6b5f", // process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

if (!FirebaseApp.apps.length) {
  FirebaseApp.initializeApp(clientCredentials)
  // Check that `window` is in scope for the analytics module!
  if (typeof window !== 'undefined') {
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ('measurementId' in clientCredentials) {
      FirebaseApp.performance()
    }
  }
}

export default FirebaseApp
// export const Firestore = FirebaseApp.firestore();
export const FirebaseAnalytics = FirebaseApp.analytics;
