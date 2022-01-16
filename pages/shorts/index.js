import { useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { useAppContext } from '../../context/firebaseContext';
import { useRouter } from 'next/router';
import Card from '../components/Card';
import Loader from '../components/loader';
import Head from 'next/head';
export default function Shorts() {
  const router = useRouter();

  const { loading, good, getGood } = useAppContext();
  useEffect(() => {
    getGood(router.pathname);
  }, []);

  return (
    <MainLayout>
      <Head>
        {' '}
        <title>шорты</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          <h3 className="title-product-block">шорты</h3>
          {good &&
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
            })}
        </>
      )}
    </MainLayout>
  );
}
