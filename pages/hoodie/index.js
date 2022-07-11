import MainLayout from '../../components/MainLayout';
import Head from 'next/head';
import Card from '../../components/Card';
import { Spinner } from '../../components/Spinner';
import { db } from '../../context/firebaseContext';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useGoodsContext } from '../../context/contextGoods';
import useSWR from 'swr';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Toolbar from '../../components/Toolbar';
import Category from '../../components/Category';
import Doubleicon from '../../components/DoubleIcon';
function Hoodie({ goodList }) {
  const goodClient = JSON.parse(goodList);

  const { state, dispatch, deleteFromCart } = useGoodsContext();

  useEffect(() => {
    if (state.hoodie.length === 0) {
      dispatch({ type: 'ADD HOODIE', payload: [...goodClient] });
    } else {
      state.hoodie.map((obj) => {
        if (
          state.cart.find((i) => {
            return i.id === obj.id;
          })
        ) {
          return obj;
        } else {
          obj.active = '';
          return obj;
        }
      });
      dispatch({ type: 'ADD HOODIE', payload: state.hoodie });
    }
  }, []);
  // const getGoods = async () => {
  //   // dispatch({ type: 'ADD HOODIE', payload: [...goodClient] });
  // };

  const add = ({ id, title, description, price, urlArr, color }) => {
    const copyGood = JSON.parse(JSON.stringify(state.hoodie));

    copyGood.forEach((item) => {
      if (item.id === id && item.active === 'active') {
        item.active = '';
        deleteFromCart(item);
      } else if (item.id === id) {
        item.active = 'active';
        dispatch({
          type: 'ADD TO CART',
          payload: {
            id,
            title,
            price,
            urlArr,
            color,
            sum: price * 5,
            cnt: 5,
            active: 'active',
          },
        });
      }
    });

    dispatch({ type: 'ADD HOODIE', payload: copyGood });
  };

  const [show, setShow] = useState(false);
  const showTwoGood = () => {
    setShow(false);
  };
  const showOneGood = () => {
    setShow(true);
  };

  return (
    <MainLayout>
      <Head>
        <title>Чоловічі спортивні худі оптом купити інтернет магазин</title>
        <meta
          name="description"
          content="▷ Чоловічі спортивні худі оптом від виробника купити в інтернет магазині. У нас: ✓ великий вибір чоловічих спортивних штанів оптом, ✔ високий рівень сервісу ₴ самі низькі ціни і ✈ доставка по всій Україні: Одеса, Київ."
        />
        <meta
          name="keywords"
          content="спортивні худі, спортивні худі чоловічі, спортивні худі оптом, чоловічі худі, худі адідас, спортивні худі адідас, спортивні худі, фітнес одяг, спортивні худі україна, спортивні худі оптом 7 км, худі ціна, худі магазин, худі ціна,"></meta>
      </Head>

      {false ? (
        <>
          <Spinner></Spinner>
          {state.hoodie.map((obj, i) => {
            return (
              <div className="productCard_block-katalog" key={i}>
                <div>
                  <Image
                    alt={'hoodie'}
                    width={300}
                    height={400}
                    src={
                      'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505'
                    }></Image>
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
            <Doubleicon show={show} showTwoGood={showTwoGood} showOneGood={showOneGood} />
            <div className="cnt-goods">Товарiв:&nbsp;{state.hoodie.length}</div>
            <Toolbar state={state.hoodie} type={'ADD HOODIE'} />
          </div>
          <div className="section-filter-products">
            <div className="section-left">
              <Category cls={'menu-for-page'}></Category>
            </div>
            <div className="section-right">
              {state.hoodie.map((good) => {
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
                    show={show}></Card>
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
  const docRef = collection(db, 'hoodie');
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { goodList: JSON.stringify(goodList) || null },
  };
}

export default Hoodie;
