import { auth } from "../Firebase/Firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";



export const doSignInWithEmailAndPassword = async(email, password) => {
    console.log('Hi'); 
  return await signInWithEmailAndPassword(auth, email, password);
};


export const doSignOut = () => {
  return auth.signOut();
};
