import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGoodsContext } from '../context/contextGoods';
import { useEffect, useState, useRef } from 'react';
import arrowNext from '../public/static/img/1904671_arrow_arrow right_change_direction_next_icon.svg';
import arrowPrev from '../public/static/img/1904658_arrow_arrow left_change_direction_left_icon.svg';

import MainLayout from '../components/MainLayout';
export default function Cart() {
  const { userOdrerCtx, userOdrerCartCtx, countGoodsMinus, countGoodsPlus, addToCart } =
    useGoodsContext();
  const inputRef = useRef();
  console.log(userOdrerCartCtx);
  return (
    <MainLayout>
      <h1>cart</h1>
      {/* <Image src={arrowPrev} alt="arrow"></Image> */}
      <div className="qty_wrapp">
        <div
          className="qty_btn bnt_minus"
          onClick={() => {
            countGoodsMinus(inputRef.current.textContent);
          }}>
          <Image src={arrowPrev} width={20} height={20} alt="arrow"></Image>
        </div>
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
        <span ref={inputRef}>{userOdrerCtx.cnt}</span>
        <div
          className="qty_btn bnt_plus"
          onClick={() => {
            countGoodsPlus(inputRef.current.textContent);
          }}>
          <Image src={arrowNext} width={20} height={20} alt="arrow"></Image>
        </div>
      </div>

      <style jsx>{`
        .block_product {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 5px;
          max-width: 700px;
          justify-content: space-around;
          min-width: 400px;
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
          border: 1px solid #e6e6e6;

          display: flex;
          justify-content: center;
          align-items: center;
        }
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
    </MainLayout>
  );
}
