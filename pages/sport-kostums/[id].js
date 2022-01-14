import CardDetail from '../components/CardDetail';
import { db } from '../../context/firebaseContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

import MainLayout from '../components/MainLayout';
export default function ({ goods }) {
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
  const querySnapshot = await getDocs(collection(db, 'sport-kostums'));
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
  console.log(id);
  const docRef = doc(db, 'sport-kostums', id);

  const docSnap = await getDoc(docRef);
  // console.log(docSnap);
  return {
    props: { goods: JSON.stringify(docSnap.data()) || null }, // will be passed to the page component as props
  };
}
