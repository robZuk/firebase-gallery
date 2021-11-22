import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  // apiKey: "AIzaSyB3fpQpAIOilvoodDWZoP1nJ4Jvjw7u4Bk",
  // authDomain: "ninja-firegram-8c985.firebaseapp.com",
  // projectId: "ninja-firegram-8c985",
  // storageBucket: "ninja-firegram-8c985.appspot.com",
  // messagingSenderId: "86712374070",
  // appId: "1:86712374070:web:a94c3a46184fdaec40d997",

  apiKey: "AIzaSyCCPUXQHmJNeqn4SY3Uq9oglYXYNQtjZ8w",
  authDomain: "fir-gallery-dd503.firebaseapp.com",
  projectId: "fir-gallery-dd503",
  storageBucket: "fir-gallery-dd503.appspot.com",
  messagingSenderId: "950243924116",
  appId: "1:950243924116:web:a5fc51a5ab0d877b8cfc81",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();
const auth = getAuth();

export { storage, app, db, auth };
