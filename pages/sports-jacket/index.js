import { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import Card from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
export default function Jacket({ goodList }) {
  const goodClient = JSON.parse(goodList);

  const [loading, setLoading] = useState(true);

  const [goods, setGood] = useState(goodClient);

  useEffect(() => {
    setLoading(false);
  }, []);
  const handlerFilterGoods = (e) => {
    const value = e.target.value;

    if (value === "priceLow") {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.price - b.price;
      });

      setGood(sortGood);
    }
    if (value === "priceHigh") {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.price - a.price;
      });

      setGood(sortGood);
    }
    if (value === "dataNew") {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.time.seconds - a.time.seconds;
      });

      setGood(sortGood);
    }
    if (value === "dataOld") {
      const copyGood = goods.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.time.seconds - b.time.seconds;
      });

      setGood(sortGood);
    }
  };
  return (
    <MainLayout>
      <Head></Head>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h2 className="title-product-block">кофти замок</h2>
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
          {goods.map((good) => {
            return (
              <Card
                description={good.description}
                id={good.id}
                key={good.id}
                title={good.title}
                price={good.price}
                url={good.url}
              ></Card>
            );
          })}
        </>
      )}
    </MainLayout>
  );
}

export async function getStaticProps(context) {
  const id = context.params;

  const docRef = collection(db, "pants");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { goodList: JSON.stringify(goodList) || null },
  };
}
