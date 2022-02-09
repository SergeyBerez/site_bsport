import { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Head from 'next/head';
import Card from '../../components/Card';
import Image from 'next/image';

import { db } from '../../context/firebaseContext';
import { collection, getDocs } from 'firebase/firestore/lite';
import Swr from '../../context/Swr';
import useSWR from 'swr';
export default function Pants({ goodList }) {
  const goodClient = JSON.parse(goodList);
  const getGoods = async (params) => {
    const docRef = collection(db, params);
    const querySnapshot = await getDocs(docRef);
    const goodList = querySnapshot.docs.map((doc) => doc.data());
    return goodList;
  };
  const { data, isValidating } = useSWR('pants', getGoods, { fallbackData: goodClient });
  // const user = Swr();

  const [goods, setGood] = useState(data);
  console.log(data);
  const handlerFilterGoods = (e) => {
    const value = e.target.value;

    if (value === 'priceLow') {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.price - b.price;
      });
      console.log(sortGood);
      setGood(sortGood);
    }
    if (value === 'priceHigh') {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.price - a.price;
      });
      console.log(sortGood);
      setGood(sortGood);
    }
    if (value === 'dataNew') {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.time.seconds - a.time.seconds;
      });
      console.log(sortGood);
      setGood(sortGood);
    }
    if (value === 'dataOld') {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.time.seconds - b.time.seconds;
      });
      console.log(sortGood);
      setGood(sortGood);
    }
  };
  return (
    <MainLayout>
      <Head>
        {' '}
        <title>штаны</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {isValidating ? (
        <>
          {goods.map((good) => {
            return (
              <div key={good.id} className="productCard_block">
                <Image
                  src={
                    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505'
                  }
                  width={300}
                  height={400}
                  alt="logo"></Image>

                <div className="product-card__title">...</div>
                <span className="block_price">... </span>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <h2 className="title-product-block">штаны</h2>
          <div className="toolbar toolbar-products">
            <div className="toolbar-sorter sorter">
              <label className="sorter-label" forhtml="sorter">
                сортувати
              </label>{' '}
              <select
                id="sorter"
                data-role="sorter"
                onChange={handlerFilterGoods}
                className="sorter-options">
                <option value="position" defaultValue="">
                  не сортовано
                </option>
                <option value="nameHight">имя а-я</option>
                <option value="nameLow">имя я-а</option>
                <option value="priceHigh">цiна:више-нижче </option>
                <option value="priceLow">цiна:нижче-вище </option>
                <option value="dataNew">спочатку новi</option>
                <option value="dataOld">спочатку стaрi</option>
              </select>
            </div>
          </div>
          {goods.map((good) => {
            return (
              <Card
                id={good.id}
                key={good.id}
                title={good.title}
                price={good.price}
                url={good.url}></Card>
            );
          })}
        </>
      )}

      <style jsx>{`
        .block_price {
          width: 100%;
          background-color: rgb(128 128 128 / 64%);
        }

        .productCard_block {
          display: flex;
          flex-direction: column;
          margin: 10px;
          padding: 5px;
          max-width: 230px;
        }
        .product-card__title {
          background-color: rgb(128 128 128 / 64%);

          margin: 5px 0;

          font-weight: 400;
        }

        @media (min-width: 320px) {
          .productCard_block {
            margin: 5px;
            flex-grow: 0;
            flex-basis: calc(100% / 2 - 10px);
            min-width: 140px;
          }
        }
        @media (min-width: 480px) {
          .productCard_block {
            margin: 5px;
            flex-grow: 0;
            flex-basis: calc(100% / 3 - 10px);
          }
        }

        @media (min-width: 680px) {
          .productCard_block {
            flex-grow: 0;
            flex-basis: calc(100% / 4 - 10px);
            min-width: 150px;
          }
        }

        @media (min-width: 1140px) {
          .productCard_block {
            flex-grow: 0;
            flex-basis: calc(100% / 5 - 10px);
            min-width: 200px;
          }
        }
      `}</style>
    </MainLayout>
  );
}

// getServerSideProps('pants');
export async function getStaticProps(context) {
  const docRef = collection(db, 'pants');
  const querySnapshot = await getDocs(docRef);

  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    // props: { goodList },
    props: { goodList: JSON.stringify(goodList) || null },
  };
}
