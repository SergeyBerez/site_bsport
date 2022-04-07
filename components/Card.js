/*
I want to thank Paul Rudnitskiy for his idea.
If you need full work version you can download it here  https://github.com/BlackStar1991/CardProduct
*/
import Link from "next/link";
import { useRouter } from "next/router";
import { useGoodsContext } from "../context/contextGoods";
import style from "./card.module.css";
import Image from "next/image";
import cart from "../public/static/img/cart.svg";
import { useEffect, useRef, useState } from "react";

export default function Card({
  id,
  title,
  description,
  price,
  urlArr,
  color,
  active,
  add,
  show,
}) {
  const router = useRouter();
  const { state, dispatch } = useGoodsContext();
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505"
  );
  const [mes, setMes] = useState("");
  const goToCardDetail = (e) => {
    e.stopPropagation();
    router.push(`${router.pathname}/${id}`);
  };
  const addToCart = (e, id) => {
    const dataAtr = e.target.dataset.id;

    state.cart.find((item) => {
      if (item.id === dataAtr) {
        console.log("ssss");
        setMes("show");
      }
    });
    if (dataAtr === id) {
      setMes("");
    }
  };
  useEffect(() => {
    // console.log("sdsdsdss", state.goods);
    // state.cart.map((item) => {
    //   if (item.active === "active") {
    //     console.log("true");
    //     setActive("active");
    //   }
    // });
    if (urlArr) {
      setImage(urlArr[0]);
    }
  }, [state.cart]);
  console.log(active);
  return (
    <>
      <div className={style["productCard_block"]}>
        <Link href={`${router.pathname}/${id}`}>
          <a className={style.a}>
            <Image src={image} width={300} height={400} alt="product"></Image>
          </a>
        </Link>
        <div className={"bottom-subtitle " + style["bottom-subtitle"]}>
          <button
            data-id={id}
            data-title="ви вже добавили цей товар у корзину"
            className={`button button-default-white ${style["button-cart"]} ${active} ${show}`}
            onClick={(e) => {
              addToCart(e, id);
              add({ id, title, description, price, urlArr, color, active });
            }}
          >
            <Image src={cart} width={20} height={20} alt="cart"></Image>
          </button>
          <button
            onClick={goToCardDetail}
            className={`button button-default-white ${style["button-buy"]}`}
          >
            детально
          </button>
        </div>
        <div className={style["product-card__title"]}>{title}</div>
        <span className={style["block_price"]}>
          {price ? price + " грн" : null}{" "}
        </span>
      </div>

      <style jsx>{`
        .show {
          display: inline-block; /* Строчно-блочный элемент */
          position: relative; /* Относительное позиционирование */
        }
        .show::after {
          color: black;
          content: attr(data-title); /* Выводим текст */
          position: absolute; /* Абсолютное позиционирование */
          left: 20%;
          top: 30%; /* Положение подсказки */
          z-index: 1; /* Отображаем подсказку поверх других элементов */
          background: rgba(255, 255, 230, 0.9); /* Полупрозрачный цвет фона */
          font-family: Arial, sans-serif; /* Гарнитура шрифта */
          font-size: 11px; /* Размер текста подсказки */
          padding: 5px 10px; /* Поля */
          border: 1px solid #333; /* Параметры рамки */
        }
        .button-default-white.active {
          background-color: #18141429;
        }
      `}</style>
    </>
  );
}
