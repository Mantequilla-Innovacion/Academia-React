import firebaseAcademia from './firebaseConfig';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth(firebaseAcademia);

export const signinUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      // ...
    })
    .catch((error) => {
      return error;
    });
};

export const logoutfirebase = () => {
  signOut(auth)
    .then(() => {
      console.log('cerro sesion');
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error);
      // An error happened.
    });
};
export const userListener = (listener) => {
  onAuthStateChanged(auth, (user) => {
    listener(user);
  });
};

export const signupUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};
