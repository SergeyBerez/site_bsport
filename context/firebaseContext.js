import { initializeApp } from 'firebase/app';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import { getDatabase } from 'firebase/database';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

import { createContext, useContext, useState, useEffect } from 'react';
const firebaseConfig = {
  apiKey: 'AIzaSyBzrbIblyAFUQRKIFIzYqRPfjCNZRbYCpo',
  authDomain: 'b-sportwear-shop.firebaseapp.com',
  databaseURL: 'https://b-sportwear-shop-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'b-sportwear-shop',
  storageBucket: 'b-sportwear-shop.appspot.com',
  messagingSenderId: '852156358107',
  appId: '1:852156358107:web:f2496a4d4c44932bb25bfe',
  measurementId: 'G-PR95NG6NW6',
};

const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export default function FirebaseContext({ children }) {
  const [good, setGood] = useState([]);
  const [onegood, setOneGood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [CurrentUser, setCurrentUser] = useState(null);
  const [uidAdmin, setUidAdmin] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        // ...
        setCurrentUser(true);
      } else {
        // User is signed out
        // ...

        setCurrentUser(false);
      }
    });
  }, []);
  const LogOut = () => {
    auth.signOut();
  };

  // const getGood = (params) => {
  //   return getGoods(db, params);
  // };
  //   export const getStaticProps = async() => {

  // }

  async function getOnceGoog(params, id) {
    try {
      const docRef = doc(db, params, id);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
        setOneGood(docSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async function getGoods(db, params) {
    try {
      setLoading(true);
      const docRef = collection(db, params);
      const querySnapshot = await getDocs(docRef);
      const goodList = querySnapshot.docs.map((doc) => doc.data());
      // console.log('get goods from Firestore', goodList);
      setGood(goodList);
      // console.log(goodList);
      setLoading(false);
      return goodList;
    } catch (error) {
      console.log('error', error);
    }
  }
  // useEffect(() => {
  //   Promise.all([getGoods(db, 'pants'), getGoods(db, 'shorts')]).then((values) => {
  //     let arr = [];
  //     values.forEach((element) => {
  //       arr.push(...element);
  //     });

  //     setGood(arr);
  //   });
  // }, []);

  return (
    <AppContext.Provider value={{ loading, uidAdmin, LogOut, CurrentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export { db };
