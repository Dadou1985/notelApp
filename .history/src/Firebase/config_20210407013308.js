mport * as firebase froim 'firebase'
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyfR1blLmTazOQgLE3ivqZTufi9s5vLNI",
  authDomain: "notel-765b1.firebaseapp.com",
  databaseURL: "https://notel-765b1.firebaseio.com",
  projectId: "notel-765b1",
  storageBucket: "notel-765b1.appspot.com",
  messagingSenderId: "746435372425",
  appId: "1:746435372425:web:0bb002f6fd3228e204ed58",
  measurementId: "G-3W8Y2DNBVZ"
  };

  firebase.initializeApp(firebaseConfig);
  
 
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export { db, auth, functions, storage }