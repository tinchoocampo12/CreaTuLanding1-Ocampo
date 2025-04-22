import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtCixAjW_AeT9l9Nozr77pO7Xt5EgRt2g",
  authDomain: "e-commerce-react-8c551.firebaseapp.com",
  projectId: "e-commerce-react-8c551",
  storageBucket: "e-commerce-react-8c551.firebasestorage.app",
  messagingSenderId: "372401294693",
  appId: "1:372401294693:web:64e8474bb3ba860a49e58c",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
