import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import Card from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
import { useGoodsContext } from "../../context/contextGoods";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Toolbar from "../../components/Toolbar";
import Category from "../../components/Category";
import Doubleicon from "../../components/DoubleIcon";
export default function Shorts({ goodList }) {
  const goodClient = JSON.parse(goodList);
  const { state, dispatch, deleteFromCart } = useGoodsContext();
  const [showGoodOnPage, SetShowGoodOnPage] = useState(0);
  const [firstNumber, SetFirstNumber] = useState(0);
  const [lastNumber, SetLastNumber] = useState(0);
  const [numberPage, SetNumberPage] = useState([]);
  useEffect(() => {
    if (state.shorts.length === 0) {
      dispatch({ type: "ADD SHORTS", payload: [...goodClient] });
    } else {
      state.shorts.map((obj) => {
        if (
          state.cart.find((i) => {
            return i.id === obj.id;
          })
        ) {
          return obj;
        } else {
          obj.active = "";
          return obj;
        }
      });
      dispatch({ type: "ADD SHORTS", payload: state.shorts });
      SetShowGoodOnPage(state.shorts.length);
      SetLastNumber(state.shorts.length);
    }
  }, [state.shorts]);
  // const getGoods = async (params) => {
  //   // dispatch({ type: 'ADD SHORTS', payload: [...goodClient] });
  // };
  // const { data, isValidating } = useSWR('shorts', getGoods, {
  //   fallbackData: goodClient,
  // });
  const [show, setShow] = useState(false);
  const showTwoGood = () => {
    setShow(false);
  };
  const showOneGood = () => {
    setShow(true);
  };
  const add = ({ id, title, price, urlArr, color, active }) => {
    const copyGood = JSON.parse(JSON.stringify(state.shorts));

    copyGood.forEach((item) => {
      if (item.id === id && item.active === "active") {
        item.active = "";
        deleteFromCart(item);
      } else if (item.id === id) {
        item.active = "active";
        dispatch({
          type: "ADD TO CART",
          payload: {
            id,
            title,
            price,
            urlArr,
            color,
            sum: price * 5,
            cnt: 5,
            active: "active",
          },
        });
      }
    });

    dispatch({ type: "ADD SHORTS", payload: [...copyGood] });
  };

  const chooseNumber = (e) => {
    let a = Math.ceil(state.shorts.length / +e.target.textContent);

    SetShowGoodOnPage(+e.target.textContent);
    numberPage.length = 0;
    for (let index = 0; index < a; index++) {
      numberPage.push(index);
    }

    SetNumberPage(numberPage);
    SetLastNumber(+e.target.textContent);
    SetFirstNumber(0);
  };

  const choosePage = (e) => {
    SetLastNumber(+e.target.textContent * showGoodOnPage);
    SetFirstNumber(+e.target.textContent * showGoodOnPage - showGoodOnPage);
  };

  return (
    <MainLayout>
      <Head>
        <title>Чоловічі спортивні шорти оптом</title>
        <meta
          name="description"
          content="▷ Чоловічі спортивні шорти оптом купити в інтернет магазині."
        />
        <meta
          name="keywords"
          content="спортивні шорти, спортивні шорти чоловічі, спортивні шорти оптом, чоловічі шорти"
        ></meta>
      </Head>

      {false ? (
        <>
          <Spinner></Spinner>
          {state.shorts.map((obj, i) => {
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
          <h1 className="title-product-block">шорти</h1>
          <div className="toolbar toolbar-products">
            <h3 className="title-category">категорii</h3>
            <Doubleicon
              show={show}
              showTwoGood={showTwoGood}
              showOneGood={showOneGood}
            />
            <div className="cnt-goods">
              Товарiв:&nbsp;
              {state?.shorts?.slice(firstNumber, lastNumber).length}
            </div>
            <Toolbar state={state.pants} type={"ADD SHORTS"} />
          </div>
          <div className="section-filter-products">
            <div className="section-left">
              <Category cls={"menu-for-page"}></Category>
              <div className="filter">
                <h3 className="sorter-label">фiльтри</h3>

                <div className="cnt-goods">
                  {state.pants.length}&nbsp;Результатiв
                </div>
              </div>
            </div>
            <h3>
              {" "}
              <ul className="ul" onClick={chooseNumber}>
                {" "}
                <li>5</li>
                <li>10</li>
                <li>50</li>
              </ul>
            </h3>
            <div className="section-right">
              {state?.shorts?.slice(firstNumber, lastNumber).map((good) => {
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
                    show={show}
                  ></Card>
                );
              })}
            </div>
          </div>
          <ul className="ul">
            {numberPage.map((i, index) => {
              return (
                <li onClick={choosePage} key={i}>
                  {i + 1}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </MainLayout>
  );
}
export async function getStaticProps() {
  const docRef = collection(db, "shorts");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { goodList: JSON.stringify(goodList) || null }, // will be passed to
  };
}
