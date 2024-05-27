// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUdeJb3SnAAj17rVFCXqkWHs7Cuh_EVgs",
    authDomain: "reservation-seances-orales.firebaseapp.com",
    projectId: "reservation-seances-orales",
    storageBucket: "reservation-seances-orales.appspot.com",
    messagingSenderId: "207235622813",
    appId: "1:207235622813:web:e364225de12665a2f47174",
    measurementId: "G-JYXDLDPQ71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};
