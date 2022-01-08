import { useEffect } from 'react';
import MainLayout from './components/MainLayout';
import { useAppContext } from '../context/firebaseContext';
import { useRouter } from 'next/router';

export default function Shorts() {
  const router = useRouter();

  const { loading, good, getGood } = useAppContext();
  useEffect(() => {
    getGood(router.pathname);
  }, []);

  return (
    <MainLayout>
      <h3>шорты</h3>{' '}
      {loading ? (
        <h1>...loading</h1>
      ) : (
        good.map((good) => {
          return <p key={good.id}>{good.title}</p>;
        })
      )}
    </MainLayout>
  );
}
