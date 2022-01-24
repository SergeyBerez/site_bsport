import CardDetail from '../../components/CardDetail';
import { db } from '../../context/firebaseContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

import MainLayout from '../../components/MainLayout';
export default function Kostum({ goods }) {
  const { description, detaileDescription, id, title, price, url, urlArr, color } =
    JSON.parse(goods);

  return (
    <MainLayout>
      <CardDetail
        color={color}
        detaileDescription={detaileDescription}
        description={description}
        key={id}
        title={title}
        price={price}
        url={url}
        urlArr={urlArr}></CardDetail>
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
