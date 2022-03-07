import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGoodsContext } from '../context/contextGoods';
import Accordion from './Accordeon';
import arrowNext from '../public/static/img/1904671_arrow_arrow right_change_direction_next_icon.svg';
import arrowPrev from '../public/static/img/1904658_arrow_arrow left_change_direction_left_icon.svg';
import Slider from './Slider';
export default function CardDetail({
  id,
  title,
  description,
  detaileDescription,
  price,
  url,
  urlArr,
  color,
}) {
  const router = useRouter();
  const { state, dispatch } = useGoodsContext();
  const { userOdrerCtx, countGoodsMinus, countGoodsPlus } = useGoodsContext();

  // const inputRef = useRef();

  const quickBuy = () => {
    router.push('/buy');
  };
  const addToCart = () => {
    dispatch({
      type: 'ADD TO CARD',
      payload: {
        id,
        title,
        description,
        price,
        url,
        color,
        sum: 0,
        // cnt: newGood ? newGood.cnt : 0,
      },
    });
    router.push('/cart');
  };
  return (
    <>
      {/* <div className="slider-wrapper"></div> */}
      <h2 className="block_name block_name__addName">{title}</h2>
      <Slider id={id} url={urlArr} grabCursor={true} pagination={true} count={1}></Slider>{' '}
      <div className="block_product">
        <div className="block_goodColor">
          <span className="text_specification">колiр : {color}</span>
        </div>
        <div className="block_price">
          <p className="block_price__currency">цiна {price ? price : 'цiну уточнiть'} грн</p>
          <p className="block_product__advantagesProduct">{description}</p>
          <div className="qty_wrapp">
            {/* <div
              className="qty_btn bnt_minus"
              onClick={() => {
                countGoodsMinus(inputRef.current.value);
              }}>
              <Image src={arrowPrev} alt="arrow"></Image>
            </div> */}
            {/* <input
              ref={inputRef}
              type="text"
              name="quantity"
              data-min="1"
              value={userOdrerCtx.cnt}
              size="2"
              id="input-quantity"
              readOnly
            /> */}

            {/* <div
              className="qty_btn bnt_plus"
              onClick={() => {
                countGoodsPlus(inputRef.current.value);
              }}>
              <Image src={arrowNext} alt="arrow"></Image>
            </div> */}
            {/* <input type="hidden" name="product_id" value={count} onChange={countGoods} /> */}
          </div>
          <div className="block-count">
            {' '}
            <button className="button button-default-white" onClick={addToCart}>
              добавити в корзину
            </button>
            <button className="button button-default-white" onClick={quickBuy}>
              купити швидко
            </button>
          </div>
        </div>

        <div className="block_descriptionInformation">
          <Accordion title={'подробно'} detaileDescription>
            {detaileDescription}
            <p>-материал двухнитка пенье</p>
            <p>-молодёжный покрой зауженные</p>
            <p>-Ткань турецкая состав: 80 % хлопок 20 % полиэстер</p>
            <p>-Штаны на манжетах, глубокие карманы на молнии</p>
          </Accordion>
        </div>
        <div className="block_descriptionInformation">
          <Accordion title={'Варианты оплаты и отправок:'}>
            {' '}
            <p>
              1. Наложка (по предоплате за доставку 100 грн, вычитаем из вычитаем из общей суммы)
            </p>
            <p>
              {' '}
              2. Полная оплата на карту (экономия 40-50 грн, на почте платите только за доставку)
              обмен размера осуществляем по договоренности
            </p>
            <p> 3. Урк почта / Justin / Новая почта</p>
          </Accordion>
        </div>
      </div>
      <style jsx>{`
        .block_product {
          overflow: hidden;

          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 15px;
          max-width: 700px;
          justify-content: space-around;
        }
        .block-count {
          width: 100%;
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }
        .block_price__currency {
          font-weight: bold;
          color: green;
          font-size: 2 rem;
        }
        .text_specification {
          font-size: 1.6rem;
        }

        // .qty_wrapp {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   margin-bottom: 20px;
        // }
        .qty_btn {
          width: 35px;
          position: relative;
          cursor: pointer;
        }

        input {
          border: 0px;
          text-align: center;
          height: 50px;
          width: 40px;
          font-size: 14px;
          color: #1a1a1a;
        }
        .button-default-white {
          width: 45%;
        }
      `}</style>
    </>
  );
}
