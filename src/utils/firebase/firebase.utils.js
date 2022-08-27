import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg1-4AR3xsS91-9hAKhIgNQeQXH2mB2TM",
  authDomain: "ecommerce-db-cead1.firebaseapp.com",
  projectId: "ecommerce-db-cead1",
  storageBucket: "ecommerce-db-cead1.appspot.com",
  messagingSenderId: "361460545845",
  appId: "1:361460545845:web:7b50e8db282ed22824f47c",
  measurementId: "G-V9N6Q8460H",
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

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, setDoc, getDoc, doc } from "firebase/firestore";

// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   signInWithRedirect,
// } from "firebase/auth";

// // Import the functions you need from the SDKs you need
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAg1-4AR3xsS91-9hAKhIgNQeQXH2mB2TM",
//   authDomain: "ecommerce-db-cead1.firebaseapp.com",
//   projectId: "ecommerce-db-cead1",
//   storageBucket: "ecommerce-db-cead1.appspot.com",
//   messagingSenderId: "361460545845",
//   appId: "1:361460545845:web:7b50e8db282ed22824f47c",
//   measurementId: "G-V9N6Q8460H",
// };

// const firebaseApp = initializeApp(firebaseConfig);

// const provider = new GoogleAuthProvider();

// provider.setCustomParameters({
//   prompt: "select_account",
// });

// export const auth = getAuth();

// export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// export const db = getFirestore();

// export const createUserDocumentFromAuth = async (userAuth) => {
//   const userDocRef = doc(db, "users", userAuth.uid);

//   const userSnapshot = await getDoc(userDocRef);

//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createdAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createdAt,
//       });
//     } catch (error) {
//       console.log("error creating the user", error.message);
//     }
//   }

//   return userDocRef;
// };
