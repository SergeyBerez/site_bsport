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
    if (value >= 20) {
      return;
    } else {
      let cnt = ++value;
      let sum = userOdrerCtx.price * value;
      setUserOdrerCtx({ ...userOdrerCtx, cnt, sum });
    }
  };
  const countGoodsMinus = (value) => {
    if (value <= 0) {
      return;
    } else {
      let cnt = --value;
      let sum = userOdrerCtx.price * value;
      setUserOdrerCtx({ ...userOdrerCtx, cnt, sum });
    }
  };
  const addToCart = () => {
    userOdrerCartCtx.push(userOdrerCtx);
    setUserOdrerCartCtx(userOdrerCartCtx);
  };

  console.log(userOdrerCartCtx);
  return (
    <GoodsContext.Provider
      value={{ userOdrerCtx, setUserOdrerCtx, countGoodsMinus, countGoodsPlus, addToCart }}>
      {children}
    </GoodsContext.Provider>
  );
}
