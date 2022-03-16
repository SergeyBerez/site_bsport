import React from "react";
import { createContext, useReducer, useContext } from "react";

const initialState = {
  goods: [],
  cart: [],
};

const GoodsContext = createContext(initialState);

export function useGoodsContext() {
  return useContext(GoodsContext);
}

export default function ContextGoods({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const countGoodsPlus = (action) => {
    const newItem = action;

    if (newItem.cnt < 20) {
      newItem.cnt = newItem.cnt + 1;

      newItem.sum = +newItem.price * newItem.cnt;
      console.log(newItem);
    }

    let newCartGoods = [...state.cart];

    let cart = newCartGoods.map((item) => {
      if (item.id === newItem.id) {
        return newItem;
      } else {
        return item;
      }
    });

    dispatch({
      type: "PLUS",
      payload: cart,
    });
  };

  const countGoodsMinus = (action) => {
    const newItem = action;

    if (newItem.cnt > 0) {
      newItem.cnt = newItem.cnt - 1;
      newItem.sum = +newItem.price * newItem.cnt;
    }

    let newCartGoods = [...state.cart];

    let cart = newCartGoods.map((item) => {
      if (item.id === newItem.id) {
        return newItem;
      } else {
        return item;
      }
    });
    dispatch({
      type: "MINUS",
      payload: cart,
    });
  };
  const deleteFromCart = (action) => {
    const newItem = action;
    let newCartGoods = [...state.cart];

    const cart = newCartGoods.filter((item) => {
      return item.id !== newItem.id;
    });
    cart;
    dispatch({
      type: "DELE FROM CARD",
      payload: cart,
    });
  };
  function reducer(state, action) {
    switch (action.type) {
      case "PLUS":
        return { ...state, cart: action.payload };
      case "MINUS":
        return { ...state, cart: action.payload };
      case "ADD GOODS":
        return { ...state, goods: action.payload };
      case "DELE FROM CARD":
        return { ...state, cart: action.payload };
      case "ADD TO CARD":
        const newItem = action.payload;
        const existItem = state.cart.find((item) => {
          return item.id === newItem.id;
        });
        let newCartGoods = [...state.cart];
        let cart = existItem
          ? newCartGoods.map((item) => {
              if (item.id === existItem.id) {
                return newItem;
              } else {
                return item;
              }
            })
          : [...state.cart, newItem];
        console.log(cart);
        localStorage.setItem("CART", JSON.stringify(cart));
        return { ...state, cart };

      default:
        return state;
    }
  }

  // const countGoodsMinus = (value) => {
  //   let num = Number(value);
  //   if (num <= 0) {
  //     return;
  //   } else {
  //     let cnt = --num;
  //     let sum = userOdrerCtx.price * num;
  //     setUserOdrerCtx({ ...userOdrerCtx, cnt, sum });
  //   }
  // };
  // const addToCart = (id, title, description, price, url) => {
  //   let a = [...userOdrerCartCtx];
  //   a.push({ id, title, description, price, url, sum: 0, cnt: 0 });
  //   setUserOdrerCartCtx(a);
  //  console.log(userOdrerCartCtx);
  // };

  // console.log(userOdrerCartCtx);
  return (
    <GoodsContext.Provider
      value={{
        state,
        dispatch,
        countGoodsPlus,
        countGoodsMinus,
        deleteFromCart,
      }}
    >
      {children}
    </GoodsContext.Provider>
  );
}
