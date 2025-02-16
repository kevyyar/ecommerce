// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZoehQSkSoX1LzMXTAri6Vb7hHcimk2h0",
  authDomain: "ecommerce-75bba.firebaseapp.com",
  projectId: "ecommerce-75bba",
  storageBucket: "ecommerce-75bba.firebasestorage.app",
  messagingSenderId: "166694290767",
  appId: "1:166694290767:web:2da8c9a1b7e958b659713a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
