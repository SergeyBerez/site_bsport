import MainLayout from '../../components/MainLayout';
import Head from 'next/head';
import Card from '../../components/Card';
import Image from 'next/image';
import { Spinner } from '../../components/Spinner';
import { db } from '../../context/firebaseContext';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useGoodsContext } from '../../context/contextGoods';
import Accordion from '../../components/Accordion';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Toolbar from '../../components/Toolbar';
import Category from '../../components/Category';
import Doubleicon from '../../components/DoubleIcon';
export default function Pants({ goodList }) {
  const goodClient = JSON.parse(goodList);

  const { state, dispatch } = useGoodsContext();
  const labelFilter = [{ value: 'манжет' }, { value: 'прямi' }, { value: 'батал' }];
  const [checkedState, setCheckedState] = useState(new Array(3).fill(false));

  useEffect(() => {
    if (state.pants.length === 0) {
      dispatch({ type: 'ADD PANTS', payload: [...goodClient] });
    }
  }, []);
  const getGoods = async () => {
    //dispatch({ type: "ADD PANTS", payload: [...goodClient] });
  };
  const { data, isValidating } = useSWR('pants', getGoods, {
    fallbackData: goodClient,
  });

  const add = ({ id, title, price, urlArr, color, active }) => {
    const copyGood = state.pants.slice();
    copyGood.map((item) => {
      if (item.id === id) {
        item.active = 'active';
      }
    });

    dispatch({ type: 'ADD PANTS', payload: [...copyGood] });

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

    if (text === 'зняти фiльтр') {
      setCheckedState(new Array(3).fill(false));
      dispatch({ type: 'ADD PANTS', payload: [...goodClient] });
    }
  };
  const handleOnChange = (e, position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item,
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
    if (inputValue === 'манжет') {
    }
    if (e.target.checked) {
      dispatch({ type: 'ADD PANTS', payload: [...filterGoods] });
    } else {
      setCheckedState(new Array(3).fill(false));

      dispatch({ type: 'ADD PANTS', payload: [...goodClient] });
    }
  };
  return (
    <MainLayout>
      <Head>
        {' '}
        <title>штани</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      {isValidating ? (
        <>
          <Spinner></Spinner>
          {state.pants.map((good) => {
            return (
              <div key={good.id} className="productCard_block-katalog">
                <Image
                  src={
                    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505'
                  }
                  width={300}
                  height={300}
                  alt="product"></Image>

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
            <Doubleicon show={show} showTwoGood={showTwoGood} showOneGood={showOneGood} />
            <div className="cnt-goods">Товарiв:&nbsp;{state.pants.length}</div>
            <Toolbar state={state.pants} type={'ADD PANTS'} />
          </div>
          <div className="section-filter-products">
            <div className="section-left">
              <Category cls={'menu-for-page'}></Category>
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
                        />{' '}
                        {item.value}
                      </label>
                    </div>
                  );
                })}

                <p className="accordion-item" onClick={ClearFilter}>
                  зняти фiльтр
                </p>
                <div className="cnt-goods">{state.pants.length}&nbsp;Результатiв</div>
              </div>
            </div>
            <div className="section-right">
              {state.pants.map((good) => {
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
  const docRef = collection(db, 'pants');
  const querySnapshot = await getDocs(docRef);
  const goodList = querySnapshot.docs.map((doc) => doc.data());

  return {
    props: { goodList: JSON.stringify(goodList) || null },
  };
}
