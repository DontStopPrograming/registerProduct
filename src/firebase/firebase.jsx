import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvo-niKJ92kNqyC7z92L1YCC23Zbp4rPk",
  authDomain: "dyamond-2f623.firebaseapp.com",
  projectId: "dyamond-2f623",
  storageBucket: "dyamond-2f623.appspot.com",
  messagingSenderId: "1037605398500",
  appId: "1:1037605398500:web:a728e849b5976c499489f1"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase