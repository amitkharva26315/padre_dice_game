import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyBaO73uK0lGvUGnxBUPbiWeSGYC3zvGmGw",
  authDomain: "the-dice-roll.firebaseapp.com",
  databaseURL: "https://the-dice-roll-default-rtdb.firebaseio.com",
  projectId: "the-dice-roll",
  storageBucket: "the-dice-roll.appspot.com",
  messagingSenderId: "745646927245",
  appId: "1:745646927245:web:06ffe6bb2213d0b19221c4",
  measurementId: "G-ZF5KM2MSRN"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
