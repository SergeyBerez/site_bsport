import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../../context/firebaseContext';
import MainLayout from '../components/MainLayout';
import Card from '../components/Card';

export default function Pants() {
  const router = useRouter();

  const { loading, good, getGood } = useAppContext();

  useEffect(() => {
    getGood(router.pathname);
  }, []);

  return (
    <MainLayout>
      <h3 className="title-product-block">штаны</h3>
      {loading ? (
        <h1>...loading</h1>
      ) : (
        good &&
        good.map((good) => {
          // return <p key={good.id}>{good.title}</p>;
          return (
            <Card
              description={good.description}
              id={good.id}
              key={good.id}
              title={good.title}
              price={good.price}
              url={good.url}></Card>
          );
        })
      )}
    </MainLayout>
  );
}
