import * as firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/analytics'

const { hostname } = window.location

const prod = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// const dev = {
//   apiKey: "AIzaSyCzlucLzYhifdRQyBAXhEStCx_dO23HjgM",
//   authDomain: "jobs-51-dev.firebaseapp.com",
//   databaseURL: "https://jobs-51-dev.firebaseio.com",
//   projectId: "jobs-51-dev",
//   storageBucket: "jobs-51-dev.appspot.com",
//   messagingSenderId: "848181112595",
//   appId: "1:848181112595:web:9809ace2ee6408149734e6",
//   measurementId: "G-7FBWEKEJNH"
// };

// export const app = firebase.initializeApp(hostname === 'jobs-51.web.app' ? prod : dev)
export const app = firebase.initializeApp(prod);

export const storage = app.storage()
export const db = app.firestore()
export const analytics = app.analytics()
export const auth = app.auth()
