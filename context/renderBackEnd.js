import { db } from './firebaseContext';
import { collection, getDocs } from 'firebase/firestore/lite';

export async function getServerSideProps(context) {
  const docRef = collection(db, context);
  const querySnapshot = await getDocs(docRef);

  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    // props: { goodList },
    props: { goodList: JSON.stringify(goodList) || null },
  };
}
