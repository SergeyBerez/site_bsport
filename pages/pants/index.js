import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import Card from "../../components/Card";
import Image from "next/image";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
import { useGoodsContext } from "../../context/contextGoods";
import Accordion from "../../components/Accordion";

import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import Toolbar from "../../components/Toolbar";
import Category from "../../components/Category";
import Doubleicon from "../../components/DoubleIcon";
export default function Pants({ fallback }) {
  const goodClient = JSON.parse(fallback);
  const [number, SetNumber] = useState(0);
  const [numberPage, SetNumberPage] = useState([]);
  const { state, dispatch, deleteFromCart } = useGoodsContext();
  const labelFilter = [
    { value: "манжет" },
    { value: "прямi" },
    { value: "батал" },
  ];
  console.log(number);
  const [checkedState, setCheckedState] = useState(new Array(3).fill(false));

  async function fetcher() {
    const docRef = collection(db, "pants");
    const querySnapshot = await getDocs(docRef);
    const goodList = querySnapshot.docs.map((doc) => doc.data());
    return goodList;
  }

  // const { data, isValidating } = useSWR(goodClient, fetcher);
  useEffect(() => {
    if (state.pants.length === 0) {
      dispatch({ type: "ADD PANTS", payload: [...goodClient] });
    } else {
      state.pants.map((obj) => {
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
      dispatch({ type: "ADD PANTS", payload: state.pants });
      SetNumber(state.pants.length);
    }
  }, [state.pants]);

  const add = ({ id, title, price, urlArr, color }) => {
    const copyGood = JSON.parse(JSON.stringify(state.pants));

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

    dispatch({ type: "ADD PANTS", payload: copyGood });
  };
  const [show, setShow] = useState(false);

  const toogleGood = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "productOneGood") {
      console.log("111");
      setShow(true);
    } else {
      console.log("222");
      setShow(false);
    }
  };
  const chooseNumber = (e) => {
    console.log(number);
    let a = Math.ceil(state.pants.length / number);
    console.log(a);
    SetNumber(e.target.textContent);
    numberPage.length = 0;
    for (let index = 0; index < a; index++) {
      numberPage.push(index);
    }
    console.log(numberPage);
    SetNumberPage(numberPage);
  };

  const ClearFilter = (e) => {
    const text = e.target.textContent.toLowerCase();

    if (text === "зняти фiльтр") {
      setCheckedState(new Array(3).fill(false));
      dispatch({ type: "ADD PANTS", payload: [...goodClient] });
    }
  };
  const handleOnChange = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const copyGood = state.pants.slice();
    const inputValue = e.target.value.toLowerCase();

    const filterGoods = copyGood.filter((item) => {
      if (item.title.toLowerCase().indexOf(inputValue) !== -1) {
        return item;
      }
    });

    if (filterGoods.length === 0) {
      filterGoods = goodClient.filter((item) => {
        if (item.title.toLowerCase().indexOf(inputValue) !== -1) {
          return item;
        }
      });
      filterGoods.push(...copyGood);
    }
    // if (inputValue === "манжет") {
    // }
    if (e.target.checked) {
      dispatch({ type: "ADD PANTS", payload: [...filterGoods] });
    } else {
      setCheckedState(new Array(3).fill(false));

      dispatch({ type: "ADD PANTS", payload: [...goodClient] });
    }
  };
  console.log("перерисовуемо компонет");
  return (
    <MainLayout>
      <Head>
        {" "}
        <title>Чоловічі спортивні штани</title>
        <meta
          name="description"
          content="Купити теплі чоловічі спортивні штани"
        />
        <meta
          name="keywords"
          content="спортивні штани, спортивні штани чоловічі, спортивні штани оптом, чоловічі штани"
        ></meta>
      </Head>

      {false ? (
        <>
          <Spinner></Spinner>
          {state.pants.map((good) => {
            return (
              <div key={good.id} className="productCard_block-katalog">
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
          <h1 className="title-product-block">штани</h1>
          <div className="toolbar toolbar-products">
            <h3 className="title-category">категорii</h3>
            <Doubleicon show={show} toogleGood={toogleGood} />
            <div className="cnt-goods">
              Товарiв:&nbsp;{state?.pants?.length}
            </div>
            <Toolbar state={state?.pants} type={"ADD PANTS"} />
          </div>
          <div className="section-filter-products">
            <div className="section-left">
              <Category cls={"menu-for-page"}></Category>
              <div className="filter">
                <h3 className="sorter-label">фiльтри</h3>
                {labelFilter.map((item, i) => {
                  return (
                    <div className="label" key={i}>
                      <label>
                        &nbsp;
                        <input
                          type="checkbox"
                          onChange={(e) => handleOnChange(e, i)}
                          checked={checkedState[i]}
                          value={item.value}
                        />{" "}
                        {item.value}
                      </label>
                    </div>
                  );
                })}

                <p className="accordion-item" onClick={ClearFilter}>
                  зняти фiльтр
                </p>
                <div className="cnt-goods">
                  {state?.pants?.length}&nbsp;Результатiв
                </div>
              </div>
            </div>
            <h3>
              {" "}
              <ul onClick={chooseNumber}>
                {" "}
                <li>5</li>
                <li>10</li>
                <li>20</li>
              </ul>
            </h3>
            <div className="section-right">
              {state?.pants?.slice(0, number).map((good, i) => {
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
          {}{" "}
          <ul>
            {numberPage.map((i, index) => {
              return <li key={i}>{i + 1}</li>;
            })}
          </ul>
        </>
      )}

      <style jsx>{`
        // .block_price {
        //   width: 100%;
        //   background-color: #c7c7c7;
        //   color: #c7c7c7;
        // }

        // .productCard_block {
        //   display: flex;
        //   flex-direction: column;
        //   margin: 10px;
        //   padding: 5px;
        //   max-width: 230px;
        // }

        // .product-card__title {
        //   background-color: #c7c7c7;
        //   color: #c7c7c7;
        //   margin: 5px 0;
        // }

        // @media (min-width: 320px) {
        //   .productCard_block {
        //     margin: 5px;
        //     flex-grow: 0;
        //     flex-basis: calc(100% / 2 - 10px);
        //     min-width: 140px;
        //   }
        // }
        // @media (min-width: 480px) {
        //   .toogle-icon {
        //     display: none;
        //   }
        //   .productCard_block {
        //     margin: 5px;
        //     flex-grow: 0;
        //     flex-basis: calc(100% / 3 - 10px);
        //   }
        // }

        // @media (min-width: 680px) {
        //   .productCard_block {
        //     flex-grow: 0;
        //     flex-basis: calc(100% / 4 - 10px);
        //     min-width: 150px;
        //   }
        // }

        // @media (min-width: 1140px) {
        //   .productCard_block {
        //     flex-grow: 0;
        //     flex-basis: calc(100% / 5 - 10px);
        //     min-width: 200px;
        //   }
        // }
      `}</style>
    </MainLayout>
  );
}

export async function getStaticProps(context) {
  const docRef = collection(db, "pants");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());
  let sortGood = goodList.sort((a, b) => {
    return b.time.seconds - a.time.seconds;
  });
  return {
    props: { fallback: JSON.stringify(sortGood) || null },
  };
}
