import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import Card from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
import { useGoodsContext } from "../../context/contextGoods";
import useSWR from "swr";
import Image from "next/image";

function Kostums({ goodList }) {
  const goodClient = JSON.parse(goodList);
  const { state, dispatch } = useGoodsContext();

  const getGoods = async () => {
    dispatch({ type: "ADD KOSTUMS", payload: [...goodClient] });
  };
  const { data, isValidating } = useSWR("shorts", getGoods, {
    fallbackData: goodClient,
  });

  const add = ({ id, title, description, price, urlArr, color }) => {
    dispatch({
      type: "ADD TO CART",
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

    const copyGood = state.kostum.slice();
    copyGood.map((item) => {
      if (item.id === id) {
        item.active = "active";
      }
    });
    dispatch({ type: "ADD KOSTUMS", payload: [...copyGood] });
  };
  const handlerFilterGoods = (e) => {
    const value = e.target.value;

    if (value === "priceLow") {
      const copyGood = state.kostum.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.price - b.price;
      });
      dispatch({ type: "ADD KOSTUMS", payload: [...sortGood] });
    }
    if (value === "priceHigh") {
      const copyGood = state.kostum.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.price - a.price;
      });
      dispatch({ type: "ADD KOSTUMS", payload: [...sortGood] });
    }
    if (value === "dataNew") {
      const copyGood = state.kostum.slice();
      let sortGood = copyGood.sort((a, b) => {
        return b.time.seconds - a.time.seconds;
      });
      dispatch({ type: "ADD KOSTUMS", payload: [...sortGood] });
    }
    if (value === "dataOld") {
      const copyGood = state.kostum.slice();
      let sortGood = copyGood.sort((a, b) => {
        return a.time.seconds - b.time.seconds;
      });
      dispatch({ type: "ADD KOSTUMS", payload: [...sortGood] });
    }
  };
  return (
    <MainLayout>
      <Head>
        <title>
          Чоловічі спортивні теплі худі оптом купити інтернет магазин
        </title>
        <meta
          name="description"
          content="▷ Чоловічі спортивні теплі худі оптом купити в інтернет магазині."
        />
        <meta
          name="keywords"
          content="спортивні кофти, спортивні теплі худі чоловічі, спортивні теплі худі оптом, чоловічі кофти спортивні"
        ></meta>
      </Head>

      {isValidating ? (
        <>
          <Spinner></Spinner>
          {state.kostum.map((obj, i) => {
            return (
              <div className="productCard_block-katalog" key={i}>
                <div>
                  <Image
                    alt={"pant"}
                    width={300}
                    height={400}
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505"
                    }
                  ></Image>
                  <div className="bottom-subtitle">
                    <button className="button button-default-white">...</button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          <h2 className="title-product-block">худi</h2>
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
                <option value="priceHigh">цена више </option>
                <option value="priceLow">цена ниже </option>
                <option value="dataNew">по датi новi</option>
                <option value="dataOld">по датi стaрi</option>
              </select>
            </div>
          </div>
          {state.kostum.map((good) => {
            return (
              <Card
                add={add}
                active={good.active}
                description={good.description}
                id={good.id}
                key={good.id}
                title={good.title}
                price={good.price}
                urlArr={good.urlArr}
              ></Card>
            );
          })}
        </>
      )}
    </MainLayout>
  );
}
export async function getStaticProps() {
  const docRef = collection(db, "hoodie");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { goodList: JSON.stringify(goodList) || null },
  };
}

export default Kostums;
