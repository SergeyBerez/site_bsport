import MainLayout from "../../components/MainLayout";
import Head from "next/head";
import Card from "../../components/Card";
import { Spinner } from "../../components/Spinner";
import { db } from "../../context/firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
import { useGoodsContext } from "../../context/contextGoods";
import useSWR from "swr";
import Image from "next/image";
import { useEffect, useState } from "react";
import Toolbar from "../../components/Toolbar";
import Category from "../../components/Category";
import Doubleicon from "../../components/DoubleIcon";
function Hoodie({ goodList }) {
  const goodClient = JSON.parse(goodList);
  const [showGoodOnPage, SetShowGoodOnPage] = useState(0);
  const [firstNumber, SetFirstNumber] = useState(0);
  const [lastNumber, SetLastNumber] = useState(0);
  const [numberPage, SetNumberPage] = useState([0]);

  const { state, dispatch, deleteFromCart } = useGoodsContext();
  async function fetcher() {
    const docRef = collection(db, "hoodie");
    const querySnapshot = await getDocs(docRef);
    const goodList = querySnapshot.docs.map((doc) => doc.data());
    return goodList;
  }

  const { data, isValidating } = useSWR(goodClient, fetcher);
  useEffect(() => {
    if (state.hoodie.length === 0) {
      dispatch({ type: "ADD HOODIE", payload: [...goodClient] });
    } else {
      state.hoodie.map((obj) => {
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
      dispatch({ type: "ADD HOODIE", payload: state.hoodie });
      SetShowGoodOnPage(state.hoodie.length);
      SetLastNumber(state.hoodie.length);
    }
  }, [state.hoodie]);
  // const getGoods = async () => {
  //   // dispatch({ type: 'ADD HOODIE', payload: [...goodClient] });
  // };

  const add = ({ id, title, description, price, urlArr, color }) => {
    const copyGood = JSON.parse(JSON.stringify(state.hoodie));

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

    dispatch({ type: "ADD HOODIE", payload: copyGood });
  };

  const chooseNumber = (e) => {
    let a = Math.ceil(state.hoodie.length / +e.target.textContent);

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

  const [show, setShow] = useState(false);
  const toogleGood = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "productOneGood") {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Чоловічі спортивні худі оптом купити інтернет магазин</title>
        <meta
          name="description"
          content="▷ Чоловічі спортивні худі оптом від виробника купити в інтернет магазині"
        />
        <meta
          name="keywords"
          content="спортивні худі, спортивні худі чоловічі, спортивні худі оптом, чоловічі худі"
        ></meta>
      </Head>

      {isValidating ? (
        <>
          <Spinner></Spinner>
          {state.hoodie.map((obj, i) => {
            return (
              <div className="productCard_block-katalog" key={i}>
                <div>
                  <Image
                    priority={true}
                    placeholder="blur"
                    alt={"hoodie"}
                    width={300}
                    height={400}
                    blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
          <h1 className="title-product-block">худi</h1>
          <div className="toolbar toolbar-products">
            <h3 className="title-category">категорii</h3>
            <Doubleicon show={show} toogleGood={toogleGood} />
            <div className="cnt-goods">
              Товарiв:&nbsp;
              {state?.hoodie?.slice(firstNumber, lastNumber).length}
            </div>
            <Toolbar state={state.hoodie} type={"ADD HOODIE"} />
          </div>
          <div className="section-filter-products">
            <div className="section-left">
              <Category cls={"menu-for-page"}></Category>
            </div>

            <div className="section-right">
              {" "}
              <ul className="ul" onClick={chooseNumber}>
                {" "}
                <li>5</li>
                <li>10</li>
                <li>50</li>
              </ul>
              {state?.hoodie?.slice(firstNumber, lastNumber).map((good) => {
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
  const docRef = collection(db, "hoodie");
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());
  let sortGood = goodList.sort((a, b) => {
    return b.time.seconds - a.time.seconds;
  });
  return {
    props: { goodList: JSON.stringify(sortGood) || null },
  };
}

export default Hoodie;
