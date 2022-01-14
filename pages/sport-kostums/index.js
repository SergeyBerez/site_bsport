import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../../context/firebaseContext';
import { db } from '../../context/firebaseContext';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite';
import Card from '../components/Card';
import MainLayout from '../components/MainLayout';
function Kostums() {
  const router = useRouter();

  const { loading, good, getGood } = useAppContext();
  useEffect(() => {
    getGood(router.pathname);
  }, []);

  return (
    <MainLayout>
      <h3 className="title-product-block">костюмы</h3>
      {loading ? (
        <h1>...loading</h1>
      ) : (
        good.map((good) => {
          return (
            <Card
              id={good.id}
              key={good.id}
              description={good.description}
              title={good.title}
              price={good.price}
              url={good.url}></Card>
          );
        })
      )}
    </MainLayout>
  );
}

// Kostums.getInitialProps = async ({ goods }) => {

// };

export default Kostums;
