import Head from 'next/head';
import { useEffect } from 'react';
import MainLayout from './components/MainLayout';
import Slider from '../context/Slider';
import New from './components/action';
// import { useAppContext } from '../context/firebaseContext';
export default function Index() {
  // const { good, getGood } = useAppContext();
  useEffect(() => {
    // getGood('pants');
  }, []);

  return (
    <MainLayout>
      {/* <New></New> */}
      <h1></h1>
      <Slider></Slider>
    </MainLayout>
  );
}
