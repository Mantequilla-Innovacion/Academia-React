import firebaseAcademia from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseAcademia);

export const signinUser = (email, password)=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    console.log(userCredential)
    // ...
  })
  .catch((error) => {
    console.log(error);
  });
}