// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBlyAQTWbcfFiyZrA2uO90sxlT6DKbHPZg",
  authDomain: "test-4a40f.firebaseapp.com",
  databaseURL: "https://test-4a40f-default-rtdb.firebaseio.com",
  projectId: "test-4a40f",
  storageBucket: "test-4a40f.appspot.com",
  messagingSenderId: "44348493040",
  appId: "1:44348493040:web:93fff400afd28bd23c0635",
  measurementId: "G-XD5H5LMHP0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const getFocusGroups = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'focus_groups'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export { firestore, auth, getFocusGroups };
