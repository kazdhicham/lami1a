/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from 'firebase/auth';
//const provider = new GoogleAuthProvider();

import bcrypt from 'bcryptjs';
const options = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
};

export const firebaseApp = initializeApp(options);
export const db = getFirestore();

//const firebaseApp = firebase.initializeApp(options);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogleHandler = async () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      return { credential, result };
      // ...
    })
    .catch(async (error) => {
      // Handle Errors here.

      // The AuthCredential type that was used.
      await GoogleAuthProvider.credentialFromError(error);
      throw new Error(error);
    });
};
export const sendSignInLinkToEmailHandler = async (email, settings) => {
  console.log({ auth, email, settings });
  sendSignInLinkToEmail(auth, email, settings)
    .then(() => {
      window.localStorage.setItem('emailForRegistration', JSON.stringify(email));
      // ...
    })

    .catch((error) => {
      console.log({ error });
      throw new Error(error);
    });
};
export const signInWithEmailLinkHandler = async (email, href) => {
  try {
    console.log({ email, href });
    const result = await signInWithEmailLink(auth, email, href);

    console.log({ result });
    return result;
    //      window.localStorage.removeItem('emailForSignIn');
    // You can access the new user via result.user
    // Additional user info profile not available via:
    // result.additionalUserInfo.profile == null
    // You can check if the user is new or existing:
    // result.additionalUserInfo.isNewUser
  } catch (error) {
    console.dir({ error });
    throw new Error(error);
  }
};

export const signInWithEmailAndPasswordHandler = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
     // const user = userCredential.user;
      return userCredential;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const createUserEmailAndPasswordHandler = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //  const user = userCredential.user;

      return userCredential;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

//
export const signOutHandler = async () => {
  try {
    return await auth.signOut();
  } catch (error) {
    throw new Error(error);
  }
};
export const collectIdAndDoc = (doc) => {
  return { id: doc.id, ...doc.data() };
};

export const encryptePassword = (password) => {
  if (!password) {
    return {
      error: true,
      message: ' No password to encrypt',
    };
  }
  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return err;
    }
    return hash;
  });
};

export const verifPassword = (password, hash) => {
  const passwordHash = hash;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};
