import {
  useState,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from "react";

import { db } from "./firebaseAuthContext";
import { collection, getDocs } from "firebase/firestore/lite";
const setToStorage = () => {
  if (typeof window !== "undefined") {
    return window.JSON.parse(localStorage.getItem("CART"));
  }
};
const initialState = {
  goods: [],
  cart: setToStorage() || [],
  pants: [],
  kostum: [],
  hoodie: [],
  shorts: [],
  kostumWarm: [],
  futbolka: [],
};

const GoodsContext = createContext(initialState);

export function useGoodsContext() {
  return useContext(GoodsContext);
}

export default function ContextGoods({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [url, setUrl] = useState("pants");
  useEffect(() => {
    // const localStorageCart = JSON.parse(localStorage.getItem("CART"));
    // console.log(localStorageCart);
    // dispatch({
    //   type: "ADD TO CART",
    //   payload: localStorageCart || state.cart,
    // });
  }, []);
  const countGoodsPlus = (action) => {
    const newItem = action;

    if (newItem.cnt < 10) {
      newItem.cnt = newItem.cnt + 5;

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
      type: "PLUS",
      payload: cart,
    });
  };

  const countGoodsMinus = (action) => {
    const newItem = action;

    if (newItem.cnt > 0) {
      newItem.cnt = newItem.cnt - 5;
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
    const newItem = { ...action };
    newItem.active = "";
    let newCartGoods = [...state.cart];

    const cart = newCartGoods.filter((item) => {
      return item.id !== newItem.id;
    });
    localStorage.setItem("CART", JSON.stringify(cart));
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
      case "ADD TO CART":
        const newItemGood = action.payload;

        const copyCartGoods = [...state.cart];

        const existGood = copyCartGoods.find((item) => {
          return item.id === newItemGood.id;
        });

        const cart = existGood
          ? copyCartGoods.map((item) => {
              if (item.id === newItemGood.id) {
                return existGood;
              } else {
                return item;
              }
            })
          : [...copyCartGoods, newItemGood];

        // let cart = existItem
        //   ? newCartGoods.map((item) => {
        //       if (item.id === existItem.id) {
        //         return newItem;
        //       } else {
        //         return item;
        //       }
        //     })
        //   : [...state.cart, newItem];
        // const uniqueArrays = newCartGoods.filter((obj, index, self) => {
        //   return (
        //     index ===
        //     self.findIndex((obj2) => {
        //       return obj2.id === obj.id;
        //     })
        //   );
        // });
        console.log(cart);
        localStorage.setItem("CART", JSON.stringify(cart));
        return { ...state, cart };
      case "ADD PANTS":
        return { ...state, pants: action.payload };
      case "ADD SHORTS":
        return { ...state, shorts: action.payload };
      case "ADD KOSTUMS":
        return { ...state, kostum: action.payload };
      case "ADD KOSTUMSWARM":
        return { ...state, kostumWarm: action.payload };
      case "ADD HOODIE":
        return { ...state, hoodie: action.payload };
      case "DELETE FROM CART":
        let copysCartGoods = [...state.cart];
        copysCartGoods.length = 0;
        cart = copysCartGoods;
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

  async function getGoods() {
    try {
      const docRef = collection(db, "pants");
      const querySnapshot = await getDocs(docRef);
      const goodList = querySnapshot.docs.map((doc) => doc.data());
      dispatch({ type: "ADD PANTS", payload: [...goodList] });
    } catch (error) {
      console.log("error", error);
    }

    try {
      const docRef = collection(db, "shorts");
      const querySnapshot = await getDocs(docRef);
      const goodList = querySnapshot.docs.map((doc) => doc.data());
      dispatch({ type: "ADD SHORTS", payload: [...goodList] });
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <GoodsContext.Provider
      value={{
        state,
        dispatch,
        countGoodsPlus,
        countGoodsMinus,
        deleteFromCart,

        getGoods,
      }}
    >
      {children}
    </GoodsContext.Provider>
  );
}
