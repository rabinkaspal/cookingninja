import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlmkhAVJwl_CvJzjI6rFTykRaKa5cwDrk",
    authDomain: "react-firebase-41ffc.firebaseapp.com",
    projectId: "react-firebase-41ffc",
    storageBucket: "react-firebase-41ffc.appspot.com",
    messagingSenderId: "51919184850",
    appId: "1:51919184850:web:371e7e75d088b662165e0b",
    measurementId: "G-N2ST8XDEF5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
