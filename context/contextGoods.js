import React from 'react';
import { createContext, useContext, useState, useReducer } from 'react';
const GoodsContext = createContext();
const initialState = {
  goods: [],
  cart: [],
};
export function useGoodsContext() {
  return useContext(GoodsContext);
}

export default function ContextGoods({ children }) {
  const [userOdrerCtx, setUserOdrerCtx] = useState({ cnt: 0 });
  const [userOdrerCartCtx, setUserOdrerCartCtx] = useState([]);

  function reducer(state, action) {
    switch (action.type) {
      case 'PLUS':
        return { ...state };
      case 'ADD GOODS':
        return { ...state, goods: action.payload };
      case 'ADD TO CARD':
        const newItem = action.payload;
        const existItem = state.cart.find((item) => {
          return item.id === newItem.id;
        });

        let cart = existItem
          ? state.cart.map((item) => {
              if (item.id === existItem.id) {
                newItem.cnt = 0;
                return newItem;
              } else {
                return item;
              }
            })
          : [...state.cart, newItem];

        return { ...state, cart };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
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

  // console.log(userOdrerCartCtx);
  return (
    <GoodsContext.Provider
      value={{
        userOdrerCtx,
        userOdrerCartCtx,
        setUserOdrerCtx,
        countGoodsMinus,
        countGoodsPlus,
        addToCart,
        state,
        dispatch,
      }}>
      {children}
    </GoodsContext.Provider>
  );
}
