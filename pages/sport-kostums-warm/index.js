import MainLayout from "../../components/MainLayout";
import { useEffect, useState } from "react";
import Head from "next/head";
import Card from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
import { useGoodsContext } from "../../context/contextGoods";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Accordion from "../../components/Accordion";
import Toolbar from "../../components/Toolbar";
import Category from "../../components/Category";
import square from "../../public/static/img/351984_crop_square_icon.svg";
import menu from "../../public/static/img/4243313_ux_basic_app_menu_icon.svg";
import Doubleicon from "../../components/DoubleIcon";
function Kostums({ goodList }) {
  const goodClient = JSON.parse(goodList);
  const { state, dispatch, deleteFromCart } = useGoodsContext();
  const labelFilter = [
    { value: "манжет" },
    { value: "прямi" },
    { value: "батал" },
  ];
  const [checkedState, setCheckedState] = useState(new Array(3).fill(false));

  const getGoods = async () => {
    console.log("111111");
    //dispatch({ type: "ADD KOSTUMS", payload: [...goodClient] });
    const docRef = collection(db, "sport-kostums");
    const querySnapshot = await getDocs(docRef);
    const goodList = querySnapshot.docs.map((doc) => doc.data());
    return goodList;
  };
  const { data, isValidating } = useSWR("sport-kostums", getGoods, {
    fallbackData: goodClient,
  });
  console.log("isValidating", data);
  useEffect(() => {
    console.log("222");
    if (state.kostum.length === 0) {
      dispatch({ type: "ADD KOSTUMS", payload: [...goodClient] });
    } else {
      state.kostum.map((obj) => {
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
      dispatch({ type: "ADD KOSTUMS", payload: state.kostum });
    }
  }, []);

  const add = ({ id, title, description, price, urlArr, color }) => {
    const copyGood = state.kostum.slice();
    copyGood.map((item) => {
      if (item.id === id) {
        item.active = "active";
      }
    });
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

    dispatch({ type: "ADD KOSTUMS", payload: [...copyGood] });
  };
  const [show, setShow] = useState(false);
  const showTwoGood = () => {
    setShow(false);
  };
  const showOneGood = () => {
    setShow(true);
  };
  const ClearFilter = (e) => {
    const text = e.target.textContent.toLowerCase();

    if (text === "зняти фiльтр") {
      setCheckedState(new Array(3).fill(false));
      dispatch({ type: "ADD KOSTUMS", payload: [...goodClient] });
    }
  };
  const handleOnChange = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const copyGood = state.kostum.slice();
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

    if (e.target.checked) {
      dispatch({ type: "ADD KOSTUMS", payload: [...filterGoods] });
    } else {
      setCheckedState(new Array(3).fill(false));

      dispatch({ type: "ADD KOSTUMS", payload: [...goodClient] });
    }
  };
  return (
    <MainLayout>
      <Head>
        <title>
          Чоловічі спортивні спортивні костюми оптом купити інтернет магазин
        </title>
        <meta
          name="description"
          content="▷ Чоловічі спортивні костюми оптом від виробника купити в інтернет магазині. У нас: ✓ великий вибір чоловічих спортивних штанів оптом, ✔ високий рівень сервісу ₴ самі низькі ціни і ✈ доставка по всій Україні: Одеса, Київ."
        />
        <meta
          name="keywords"
          content="спортивні костюми, спортивні костюми чоловічі, спортивні костюми оптом, чоловічі костюми, спортивні костюми адідас, спортивні костюми адідас, костюми, фітнес одяг, спортивні костюми україна, спортивні костюми оптом 7 км, спортивні костюми ціна, спортивні костюми магазин, спортивні костюми ціна,"
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
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    alt={"pant"}
                    width={300}
                    height={400}
                    src={
                      "data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
          <h1 className="title-product-block">спортивнi костюми</h1>
          <div className="toolbar toolbar-products">
            <h3 className="title-category">категорii</h3>
            <Doubleicon
              show={show}
              showTwoGood={showTwoGood}
              showOneGood={showOneGood}
            />
            <div className="cnt-goods">Товарiв:&nbsp;{state.kostum.length}</div>
            <Toolbar state={state.kostum} type={"ADD KOSTUMS"}></Toolbar>
          </div>

          <div className="section-filter-products">
            <div className="section-left">
              <Category cls={"menu-for-page"}></Category>
              <div className="filter">
                <h3 className="sorter-label">фiльтри</h3>
                {labelFilter.map((item, i) => {
                  return (
                    <div div className="label" key={i}>
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
                  {state.kostum.length}&nbsp;Результатiв
                </div>
              </div>
            </div>

            <div className="section-right">
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
                    show={show}
                  ></Card>
                );
              })}
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
export async function getStaticProps() {
  const docRef = collection(db, "sport-kostums");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { goodList: JSON.stringify(goodList) || null },
  };
}

export default Kostums;
