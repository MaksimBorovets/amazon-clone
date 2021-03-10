import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyB5j8sVtyTwmN4TIe4doLGNqGeDi2qNI7I",
  authDomain: "clone-59988.firebaseapp.com",
  projectId: "clone-59988",
  storageBucket: "clone-59988.appspot.com",
  messagingSenderId: "347244688489",
  appId: "1:347244688489:web:fffb948eff7d2eb3031ef8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth();

export {db, auth}