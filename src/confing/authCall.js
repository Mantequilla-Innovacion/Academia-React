import firebaseAcademia from "./firebaseConfig";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

export const logoutfirebase = () => {
  signOut(auth)
  .then(() => {
    console.log("cerro sesion")
    // Sign-out successful.
  }).catch((error) => {
    console.log(error)
    // An error happened.
  });
};
export const userListener = (listener) => {
  onAuthStateChanged(auth,(user) => {
    listener(user)
  })
}