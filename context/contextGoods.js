import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
const GoodsContext = createContext();
export function useGoodsContext() {
  return useContext(GoodsContext);
}
export default function ContextGoods({ children }) {
  const [userOdrerCtx, setUserOdrerCtx] = useState({});
  const [userOdrerCartCtx, setUserOdrerCartCtx] = useState([]);

  const countGoodsPlus = (value) => {
    let num = Number(value);
    if (num >= 20) {
      return;
    } else {
      console.log(num.textContent);
      let cnt = ++num;
      let sum = userOdrerCtx.price * num;
      setUserOdrerCtx({ ...userOdrerCtx, cnt, sum });
    }
  };
  const countGoodsMinus = (value) => {
    let num = Number(value);
    if (num <= 0) {
      return;
    } else {
      let cnt = --num;
      let sum = userOdrerCtx.price * num;
      setUserOdrerCtx({ ...userOdrerCtx, cnt, sum });
    }
  };
  const addToCart = (id, title, description, price, url) => {
    let a = [...userOdrerCartCtx];
    a.push({ id, title, description, price, url, sum: 0, cnt: 0 });
    setUserOdrerCartCtx(a);
    // console.log(userOdrerCartCtx);
  };

  console.log(userOdrerCartCtx);
  return (
    <GoodsContext.Provider
      value={{
        userOdrerCtx,
        userOdrerCartCtx,
        setUserOdrerCtx,
        countGoodsMinus,
        countGoodsPlus,
        addToCart,
      }}>
      {children}
    </GoodsContext.Provider>
  );
}
