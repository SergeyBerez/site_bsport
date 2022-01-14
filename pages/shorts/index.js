import { useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppContext } from '../../context/firebaseContext';
import { useRouter } from 'next/router';
import Card from '../components/Card';
export default function Shorts() {
  const router = useRouter();

  const { loading, good, getGood } = useAppContext();
  useEffect(() => {
    getGood(router.pathname);
  }, []);

  return (
    <MainLayout>
      <h3 className="title-product-block">шорты</h3>{' '}
      {loading ? (
        <h1>...loading</h1>
      ) : (
        good.map((good) => {
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
