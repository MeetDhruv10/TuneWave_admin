// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXb8t6663WcziLy-jpEy4Ml7clVgkt_bA",
  authDomain: "tunewave-admin.firebaseapp.com",
  projectId: "tunewave-admin",
  storageBucket: "tunewave-admin.appspot.com",
  messagingSenderId: "603056216656",
  appId: "1:603056216656:web:ea48b5ed01f5d5353ecf55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };

