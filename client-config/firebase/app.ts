import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBCRBBaJCPxvv4A1iqBYaFDn8umbs-gpQQ",
  authDomain: "avalon-bikers.firebaseapp.com",
  projectId: "avalon-bikers",
  storageBucket: "avalon-bikers.appspot.com",
  messagingSenderId: "507668939569",
  appId: "1:507668939569:web:5cac6649d931fdf49a6610",
  measurementId: "G-MPLYM744L2",
};

export const app = initializeApp(firebaseConfig);
