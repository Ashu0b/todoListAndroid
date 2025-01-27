import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC81VCr5twcemjCNp24V7DX1R4Csva8RCE",
  authDomain: "todolist-4450a.firebaseapp.com",
  projectId: "todolist-4450a",
  storageBucket: "todolist-4450a.appspot.com",
  messagingSenderId: "853905590030",
  appId: "1:853905590030:web:67e57c75091f05a47bf95f",
  measurementId: "G-J124F1B9NK",
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
