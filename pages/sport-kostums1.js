import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/firebaseContext';
import Cards from './components/Card';
import MainLayout from '/pages/components/MainLayout';
export default function Kostums() {
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
            <Cards
              id={good.id}
              key={good.id}
              title={good.title}
              price={good.price}
              url={good.url}></Cards>
          );
        })
      )}
    </MainLayout>
  );
}
