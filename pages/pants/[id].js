import CardDetail from '../components/CardDetail';

import { useRouter } from 'next/router';

import MainLayout from '../components/MainLayout';
import { db } from '../../context/firebaseContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

export default function Pants({ goods }) {
  const good = JSON.parse(goods);

  return (
    <MainLayout>
      <CardDetail
        description={good.description}
        key={good.id}
        title={good.title}
        price={good.price}
        url={good.url}></CardDetail>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const querySnapshot = await getDocs(collection(db, 'pants'));
  const paths = querySnapshot.docs.map((doc) => {
    return { params: { id: doc.id.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const docRef = doc(db, 'pants', id);

  const docSnap = await getDoc(docRef);

  return {
    props: { goods: JSON.stringify(docSnap.data()) || null }, // will be passed to the page component as props
  };
}
