// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACFbSf9-7cR9phFnQYDXKF6HC_po53haM",
  authDomain: "mantequilla-academia.firebaseapp.com",
  projectId: "mantequilla-academia",
  storageBucket: "mantequilla-academia.firebasestorage.app",
  messagingSenderId: "392194335128",
  appId: "1:392194335128:web:2893552cb1b5e5497c8bed"
};

// Initialize Firebase
const firebasAcademia = initializeApp(firebaseConfig);
export default firebasAcademia;