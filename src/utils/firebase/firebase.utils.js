import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTYTVRpZ68JsBQQa25YL-o5IscO-EVvm4",
  authDomain: "crwn-clothing-44d84.firebaseapp.com",
  projectId: "crwn-clothing-44d84",
  storageBucket: "crwn-clothing-44d84.appspot.com",
  messagingSenderId: "398744136392",
  appId: "1:398744136392:web:e91641f5fb346445fdd3fd",
  measurementId: "G-LEJTTHT42D",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  // if user doesn't exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};
