import CardDetail from "../../components/CardDetail";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs, doc, getDoc } from "firebase/firestore/lite";
import MainLayout from "../../components/MainLayout";

export default function Shorts({ goods }) {
  const {
    description,
    detaileDescription,
    id,
    title,
    price,
    url,
    urlArr,
    color,
  } = JSON.parse(goods);

  return (
    <MainLayout>
      <CardDetail
        color={color}
        detaileDescription={detaileDescription}
        description={description}
        key={id}
        id={id}
        title={title}
        price={price}
        url={url}
        urlArr={urlArr}
      ></CardDetail>
    </MainLayout>
  );
}

export async function getStaticPaths() {
  const querySnapshot = await getDocs(collection(db, "shorts"));
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

  const docRef = doc(db, "shorts", id);

  const docSnap = await getDoc(docRef);

  return {
    props: { goods: JSON.stringify(docSnap.data()) || null }, // will be passed to the page component as props
  };
}
