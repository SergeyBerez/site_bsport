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
  const [uidUser, setUidUser] = useState(null);
  console.log(CurrentUser, uidUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setUidUser(true);
        // LogInUser(uid);
      } else {
        setUidUser(false);
      }
    });
  }, []);

  // const LogInUser = async (id) => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'users'));
  //     const users = [];
  //     querySnapshot.forEach((doc) => {
  //       users.push(doc.data());
  //     });
  //     setCurrentUser(
  //       users.find((user) => {
  //         return user.id === id;
  //       }),
  //     );

  // setMassageForLogIn('ви уcпiшно ввiйшли');
  // setDisbled(true);
  // setValueInputLogIn({ ...valueInputsLogIn, password: '', email: '' });
  // } catch (error) {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // console.log(errorCode);
  // if (errorCode === 'auth/internal-error') {
  //   setMassageForLogIn('введiть пароль');
  // } else if (errorCode === 'auth/wrong-password') {
  //   setMassageForLogIn('неправильний пароль');
  // } else if (errorCode === 'auth/invalid-email') {
  //   setMassageForLogIn('введiть пароль');
  // } else {
  //   console.log(errorMessage);
  // }
  //   }
  // };

  // const LogOut = () => {
  //   auth.signOut();
  //   setCurrentUser(null);
  // };

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
    <AppContext.Provider value={{ uidUser, loading, CurrentUser, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  );
}

export { db, auth };
