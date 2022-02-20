import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBCoRA8gNYPU9_u3eq5m8NBxYAmdO6-jc0",
  authDomain: "react-native-blog-app-b8cb4.firebaseapp.com",
  projectId: "react-native-blog-app-b8cb4",
  storageBucket: "react-native-blog-app-b8cb4.appspot.com",
  messagingSenderId: "852585725259",
  appId: "1:852585725259:web:763323191a805f11f23cce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)