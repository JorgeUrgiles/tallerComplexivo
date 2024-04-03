// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1mcitrrtDtYDwnLEPxa9bzHQQWC0Q2WY",
  authDomain: "practicacomplexivo1.firebaseapp.com",
  projectId: "practicacomplexivo1",
  storageBucket: "practicacomplexivo1.appspot.com",
  messagingSenderId: "883613806199",
  appId: "1:883613806199:web:88efbd87d5d6b15e5d6072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });