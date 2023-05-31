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
  const [showGoodOnPage, SetShowGoodOnPage] = useState(0);
  const [firstNumber, SetFirstNumber] = useState(0);
  const [lastNumber, SetLastNumber] = useState(0);
  const [numberPage, SetNumberPage] = useState([]);
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

      SetLastNumber(state.kostum.length);
      SetShowGoodOnPage(state.kostum.length);
    }
  }, [state.kostum]);

  const add = ({ id, title, description, price, urlArr, color }) => {
    const copyGood = state.kostum.slice();

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

    dispatch({ type: "ADD KOSTUMS", payload: [...copyGood] });
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

  const [show, setShow] = useState(false);
  const toogleGood = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "productOneGood") {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const chooseNumber = (e) => {
    let a = Math.ceil(state.kostum.length / +e.target.textContent);

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
        <title>
          Чоловічі спортивні спортивні костюми оптом купити інтернет магазин
        </title>
        <meta
          name="description"
          content="▷ Чоловічі спортивні костюми оптом купити в інтернет магазині."
        />
        <meta
          name="keywords"
          content="спортивні костюми, спортивні костюми чоловічі, спортивні костюми оптом, чоловічі костюми,"
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
            <Doubleicon show={show} toogleGood={toogleGood} />
            <div className="cnt-goods">
              Товарiв:&nbsp;
              {state?.kostum?.slice(firstNumber, lastNumber).length}
            </div>
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
              <ul className="ul" onClick={chooseNumber}>
                {" "}
                <li>5</li>
                <li>10</li>
                <li>50</li>
              </ul>
              {state?.kostum?.slice(firstNumber, lastNumber).map((good) => {
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
          <ul className="ul" onClick={choosePage}>
            {numberPage.map((i, index) => {
              return <li key={i}>{i + 1}</li>;
            })}
          </ul>
        </>
      )}
    </MainLayout>
  );
}
export async function getStaticProps() {
  const docRef = collection(db, "sport-kostums");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());
  let sortGood = goodList.sort((a, b) => {
    return b.time.seconds - a.time.seconds;
  });
  return {
    props: { goodList: JSON.stringify(sortGood) || null },
  };
}

export default Kostums;
