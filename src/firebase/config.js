import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const path = require("path");
const __dirname = path.resolve();

require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") });
//import dotenv from "dotenv";
//require("dotenv").config({ path: require("find-config")(".env") });

//dotenv.config();

//require("dotenv").config();
// TODO: Replace the following with your app's Firebase project configuration
console.log(process.env);
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore();
const auth = getAuth();

export { storage, app, db, auth };
