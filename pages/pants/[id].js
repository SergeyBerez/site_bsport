import CardDetail from '../../components/CardDetail';
import MainLayout from '../../components/MainLayout';
import { db } from '../../context/firebaseContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';

export default function Pants({ good }) {
  const { description, detaileDescription, id, title, price, url, urlArr, color } =
    JSON.parse(good);

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
  console.log(context);
  const docRef = doc(db, 'pants', id);

  const docSnap = await getDoc(docRef);

  return {
    props: { goods: JSON.stringify(docSnap.data()) || null }, // will be passed to the page component as props
  };
}
