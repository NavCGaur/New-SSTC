// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_ISz7yfFZXFfchRKW_FjAl_r6MxLwLuU",
  authDomain: "accountancy-e940c.firebaseapp.com",
  projectId: "accountancy-e940c",
  storageBucket: "accountancy-e940c.firebasestorage.app",
  messagingSenderId: "404877977247",
  appId: "1:404877977247:web:179c1e5a9a21f0d463a4aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
