import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGoodsContext } from '../context/contextGoods';
import { useEffect, useState, useRef } from 'react';
import arrowNext from '../public/static/img/1904671_arrow_arrow right_change_direction_next_icon.svg';
import arrowPrev from '../public/static/img/1904658_arrow_arrow left_change_direction_left_icon.svg';

import MainLayout from '../components/MainLayout';
export default function Cart() {
  const { state, userOdrerCtx, userOdrerCartCtx, countGoodsMinus, countGoodsPlus, addToCart } =
    useGoodsContext();
  const inputRef = useRef();
  console.log(state);
  return (
    <MainLayout>
      <h1 className="title-product-block">Корзина</h1>

      <div className="cart-item_section-left">
        {' '}
        {state.cart.map((item, i) => {
          return (
            <div className="cart-item_section" key={i}>
              <Image alt={'pant'} width={150} height={200} src={item.url}></Image>
              <div className="cart-item-block">
                <div className="cart-item_header">{item.title}</div>
                <div className="cart-item_table-column">
                  <div className="table-header-column">цвет&nbsp;:</div>{' '}
                  <div className="textBold">черный</div>
                </div>
                <div className="cart-item_table-column">
                  {' '}
                  <div className="table-header-column">количество&nbsp;:</div>
                  <div className="qty_wrapp">
                    <div
                      className="qty_btn bnt_minus"
                      onClick={() => {
                        countGoodsMinus(inputRef.current.value);
                      }}>
                      <Image src={arrowPrev} width={20} height={20} alt="arrow"></Image>
                    </div>
                    <input
                      className="input-quantity"
                      ref={inputRef}
                      type="text"
                      value={userOdrerCtx.cnt}
                      readOnly
                    />

                    <div
                      className="qty_btn bnt_plus"
                      onClick={() => {
                        countGoodsPlus(inputRef.current.value);
                      }}>
                      <Image src={arrowNext} width={20} height={20} alt="arrow"></Image>
                    </div>
                  </div>
                </div>
                <div className="block_price">
                  {' '}
                  <div className="cart-item_table-column">
                    <div className="table-header-column">цiна&nbsp;:</div>{' '}
                    <div className="textBold">244</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cart-item_section-buy">
        <div className="cart-item_table-column">
          <h2 className="title-product-block">всего&nbsp;:</h2>{' '}
          <div className="textBold">244454</div>
        </div>
        <button className="button button-default-white">купити</button>
      </div>
      <style jsx>{`
        .table-header {
          width: 100%;
        }
        .cart-item_section-left {
          width: 80%;
        }
        .textBold {
          font-weight: 600;
        }
        .cart-item_section {
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          align-items: center;
          border-bottom: 1px solid #e6e6e6;
          padding: 10px 0;
        }
        .cart-item_section-buy {
          width: 100%;
          margin: 0 10px;
          border-bottom: 1px solid #e6e6e6;
        }
        .cart-item-block {
          flex-grow: 1;
          display: flex;
          flex-wrap: wrap;

          justify-content: space-around;
          align-items: center;
        }
        .cart-item_header {
          margin: 10px 0;
          width: 100%;
          text-align: center;
        }
        .table-header-column {
          font-size: 1.2rem;
          margin: 5px 0;

          color: #000;
        }
        .block_price {
          // min-width: 300px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .cart-item_table-column {
          margin-bottom: 20px;
          text-align: center;
          width: 100%;
          // border-top: 1px solid #e6e6e6;
          // max-width: 260px;
          // min-width: 160px;
        }
        .block_product {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 5px;
          max-width: 700px;
          justify-content: space-around;
          min-width: 300px;
        }
        .block-count {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        .block_price__currency {
          font-weight: bold;
          color: green;
          font-size: 2 rem;
        }
        .text_specification {
          font-size: 1.6rem;
        }
        .block_descriptionInformation {
          margin-top: 20px;
        }
        .qty_wrapp {
          // border: 1px solid #e6e6e6;

          display: flex;

          justify-content: center;
          align-items: center;
        }
        .qty_btn {
          cursor: pointer;
        }

        .input-quantity {
          border: none;
          text-align: center;
          width: 50px;
          font-size: 14px;
          color: #1a1a1a;
          font-weight: 600;
        }
        .button-default-white {
          padding: 5px 0;
        }

        @media (min-width: 360px) {
          .cart-item-block {
            width: 100%;
          }
          .cart-item_table-column {
            margin-bottom: 20px;
            width: 30%;
            margin: 10px 0;
          }
          .block_price {
            width: 100%;
            flex-wrap: nowrap;
          }
        }
        @media (min-width: 570px) {
          .cart-item-block {
            width: 0%;
          }
          .cart-item_table-column {
            margin-bottom: 20px;
            width: 30%;
            margin: 10px 0;
          }
          .block_price {
            width: 30%;
            flex-wrap: nowrap;
          }
          .cart-item_section-buy {
            top: 120px;
            right: 0;
            position: fixed;
            width: 15%;
            margin: 0 10px;
            border-bottom: 1px solid #e6e6e6;
            background-color: white;
          }
        }
      `}</style>
    </MainLayout>
  );
}
