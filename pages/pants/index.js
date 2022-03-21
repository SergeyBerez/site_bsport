import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import Card from "../../components/Card";
import Image from "next/image";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseContext";
import { collection, getDocs } from "firebase/firestore/lite";
import { useGoodsContext } from "../../context/contextGoods";

import useSWR from "swr";
export default function Pants({ goodList }) {
  const goodClient = JSON.parse(goodList);
  const { state, dispatch } = useGoodsContext();
  const [goods, setGood] = useState();

  const getGoods = async (params) => {
    dispatch({ type: "ADD GOODS", payload: [...goodClient] });
    // const docRef = collection(db, params);
    // const querySnapshot = await getDocs(docRef);
    // const goodList = querySnapshot.docs.map((doc) => doc.data());
    // return goodList;
  };
  const { data, isValidating } = useSWR("sport-kostums", getGoods, {
    fallbackData: goodClient,
  });

  useEffect(() => {
    console.log("use effect kostums", isValidating);
  }, [state.goods]);

  const add = ({ id, title, description, price, urlArr, color }) => {
    dispatch({
      type: "ADD TO CARD",
      payload: {
        id,
        title,
        price,
        urlArr,
        color,
        sum: 0,
        cnt: 1,
        active: "active",
      },
    });

    const copyGood = state.goods.slice();
    copyGood.map((item) => {
      if (item.id === id) {
        item.active = "active";
      }
    });
    dispatch({ type: "ADD GOODS", payload: [...copyGood] });
  };
  const handlerFilterGoods = (e) => {
    const value = e.target.value;

    if (value === "priceLow") {
      const copyGood = state.goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.price - b.price;
      });
      dispatch({ type: "ADD GOODS", payload: [...sortGood] });
    }
    if (value === "priceHigh") {
      const copyGood = state.goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.price - a.price;
      });
      dispatch({ type: "ADD GOODS", payload: [...sortGood] });
    }
    if (value === "dataNew") {
      const copyGood = state.goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.time.seconds - a.time.seconds;
      });
      dispatch({ type: "ADD GOODS", payload: [...sortGood] });
    }
    if (value === "dataOld") {
      const copyGood = state.goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.time.seconds - b.time.seconds;
      });
      dispatch({ type: "ADD GOODS", payload: [...sortGood] });
    }
  };

  return (
    <MainLayout>
      <Head>
        {" "}
        <title>штаны</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {false ? (
        <>
          <Spinner></Spinner>
          {state.goods.map((good) => {
            return (
              <div key={good.id} className="productCard_block">
                <Image
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505"
                  }
                  width={300}
                  height={300}
                  alt="product"
                ></Image>

                <div className="product-card__title">...</div>
                <span className="block_price">...</span>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <h1 className="title-product-block">штаны</h1>
          <div className="toolbar toolbar-products">
            <div className="toolbar-sorter sorter">
              <label className="sorter-label" forhtml="sorter">
                сортувати
              </label>{" "}
              <select
                id="sorter"
                data-role="sorter"
                onChange={handlerFilterGoods}
                className="sorter-options"
              >
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
          {state.goods.map((good) => {
            return (
              <Card
                add={add}
                active={good.active}
                id={good.id}
                key={good.id}
                title={good.title}
                price={good.price}
                urlArr={good.urlArr}
                color={good.color}
                description={good.description}
              ></Card>
            );
          })}
        </>
      )}

      <style jsx>{`
        .block_price {
          width: 100%;
          background-color: #c7c7c7;
          color: #c7c7c7;
        }

        .productCard_block {
          display: flex;
          flex-direction: column;
          margin: 10px;
          padding: 5px;
          max-width: 230px;
        }

        .product-card__title {
          background-color: #c7c7c7;
          color: #c7c7c7;
          margin: 5px 0;
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
  const docRef = collection(db, "pants");
  const querySnapshot = await getDocs(docRef);

  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    // props: { goodList },
    props: { goodList: JSON.stringify(goodList) || null },
  };
}
