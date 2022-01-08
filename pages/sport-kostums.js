import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/firebaseContext';
import MainLayout from '/pages/components/MainLayout';
export default function Kostums() {
  const router = useRouter();

  const { loading, good, getGood } = useAppContext();
  useEffect(() => {
    getGood(router.pathname);
  }, []);

  return (
    <MainLayout>
      <h3>костюмы</h3>
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
