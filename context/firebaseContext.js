import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getDatabase } from 'firebase/database';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { createContext, useContext, useState, useEffect } from 'react';
const firebaseConfig = {
  apiKey: 'AIzaSyBzrbIblyAFUQRKIFIzYqRPfjCNZRbYCpo',
  authDomain: 'b-sportwear-shop.firebaseapp.com',
  databaseURL: 'https://b-sportwear-shop-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'b-sportwear-shop',
  storageBucket: 'b-sportwear-shop.appspot.com',
  messagingSenderId: '852156358107',
  appId: '1:852156358107:web:7f728f95d0cd0079b25bfe',
  measurementId: 'G-QHFSLLVTXE',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function FirebaseContext({ children }) {
  const [good, setGood] = useState([]);
  const [loading, setLoading] = useState(false);
  const getGood = (params) => {
    getGoods(db, params);
  };

  async function getGoods(db, params) {
    try {
      setLoading(true);
      const goodCol = collection(db, params);
      const goodSnapshot = await getDocs(goodCol);

      const goodList = goodSnapshot.docs.map((doc) => doc.data());
      console.log('get goods from Firestore', goodList);
      setGood(goodList);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  }
  useEffect(() => {
    getGood('pants');
  }, []);

  return <AppContext.Provider value={{ loading, good, getGood }}>{children}</AppContext.Provider>;
}

const AppContext = createContext();
export function useAppContext() {
  return useContext(AppContext);
}
