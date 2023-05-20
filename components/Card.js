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
import phone from "../public/static/img/local_phone_icon.svg";
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
  console.log(active);
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

    // state.cart.find((item) => {
    //   if (item.id === dataAtr) {
    //     setMes("show");
    //   }
    // });
    // if (dataAtr === id) {
    //   setMes("");
    // }
  };
  useEffect(() => {
    if (urlArr) {
      setImage(urlArr[0]);
    }
  }, []);

  return (
    <>
      <div
        className={
          show ? style["productCard_block"] : style["productCard_block-two"]
        }
      >
        <Link href={`${router.pathname}/${id}`}>
          <a className={style.a}>
            <Image
              src={image}
              width={300}
              height={400}
              alt="product"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
            ></Image>
          </a>
        </Link>
        <div className={style["product-card__title"]}>{title}</div>
        <div className={style["bottom-subtitle"]}>
          <button
            onClick={goToCardDetail}
            className={`button button-default-white none ${style["button-buy"]}`}
          >
            детально
          </button>
          <button
            className={`button button-default-white none ${style["button-phone"]}`}
          >
            <a href="tel:+380632483200" className="jsx-89893122e891ec04">
              {" "}
              <Image src={phone} width={20} height={20} alt="phone"></Image>
            </a>
          </button>
        </div>
        <div className={style["bottom-subtitle"]}>
          <p className={style.block_price}>Ціна за шт {price}&nbsp;₴</p>
          <button
            data-id={id}
            data-title="ви вже добавили цей товар у корзину"
            className={`button button-default-white none ${style["button-cart"]} ${active} ${show}`}
            onClick={(e) => {
              // addToCart(e, id);
              add({ id, title, description, price, urlArr, color, active });
            }}
          >
            <Image
              className="cart"
              src={cart}
              width={20}
              height={20}
              alt="cart"
            ></Image>
          </button>
        </div>
      </div>

      <style jsx>{`
        // .show {
        //   display: inline-block; /* Строчно-блочный элемент */
        //   position: relative; /* Относительное позиционирование */
        // }
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
