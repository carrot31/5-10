// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANDSxQ0vsUYW2ny7rcTXrow1EWg2rH-Mg",
  authDomain: "sparta-react-basic-400bc.firebaseapp.com",
  projectId: "sparta-react-basic-400bc",
  storageBucket: "sparta-react-basic-400bc.appspot.com",
  messagingSenderId: "1058550918773",
  appId: "1:1058550918773:web:c0c3f65aeef26d2061923c",
  measurementId: "G-T04VLQVKWS",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };
