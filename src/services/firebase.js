import { initializeApp } from "firebase/app";

import{getFirestore} from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDqWNMZwAXf29EJNEi2ly9g4uCtEzcV8DI",
  authDomain: "facu-b4ea4.firebaseapp.com",
  projectId: "facu-b4ea4",
  storageBucket: "facu-b4ea4.appspot.com",
  messagingSenderId: "119914170207",
  appId: "1:119914170207:web:1860c70fb25435778218ea"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
export default fireBaseApp;