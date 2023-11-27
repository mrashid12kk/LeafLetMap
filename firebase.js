// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD_eb1eFMfl4taSgk_24kOnHH3DziQnUsg",
  authDomain: "it-vision-d1fd2.firebaseapp.com",
   databaseURL: "https://it-vision-d1fd2-default-rtdb.firebaseio.com/", 
  projectId: "it-vision-d1fd2",
  storageBucket: "it-vision-d1fd2.appspot.com",
  messagingSenderId: "1066791742655",
  appId: "1:1066791742655:web:fcf03b50cd56800306aa0a",
  measurementId: "G-WBWSG6EGYW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
