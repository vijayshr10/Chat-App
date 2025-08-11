// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRiTWGjRgKrov5PXGcQxE3GoYuQN9xVMY",
  authDomain: "vijay-chat-app-3663c.firebaseapp.com",
  projectId: "vijay-chat-app-3663c",
  storageBucket: "vijay-chat-app-3663c.firebasestorage.app",
  messagingSenderId: "610741091481",
  appId: "1:610741091481:web:0d688d534880d9090f4c08",
  measurementId: "G-EFGG08KGEM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);