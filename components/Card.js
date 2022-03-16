/*
I want to thank Paul Rudnitskiy for his idea.
If you need full work version you can download it here  https://github.com/BlackStar1991/CardProduct
*/
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGoodsContext } from '../context/contextGoods';
import style from './card.module.css';
import Image from 'next/image';
import cart from '../public/static/img/cart.svg';
import { useEffect, useRef, useState } from 'react';

export default function Card({ id, title, description, price, url, color }) {
  const router = useRouter();
  const { state, dispatch } = useGoodsContext();
  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  );

  const goToCardDetail = (e) => {
    console.log('gotodtail' + id);
    e.stopPropagation();
    router.push(`${router.pathname}/${id}`);
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
        sum: +price,
        cnt: 1,
      },
    });
  };
  useEffect(() => {
    if (url) {
      setImage(url);
    }
  }, [state.cart]);
  return (
    <>
      <div className={style['productCard_block']}>
        <Link href={`${router.pathname}/${id}`}>
          <a className={style.a}>
            <Image src={image} width={300} height={400} alt="product"></Image>
          </a>
        </Link>
        <div className={'bottom-subtitle ' + style['bottom-subtitle']}>
          <button
            className={`button button-default-white ${style['button-cart']}`}
            onClick={addToCart}>
            <Image src={cart} width={20} height={20} alt="logo"></Image>
          </button>
          <button
            onClick={goToCardDetail}
            className={`button button-default-white ${style['button-buy']}`}>
            детально
          </button>
        </div>
        <div className={style['product-card__title']}>{title}</div>
        <span className={style['block_price']}>{price ? price + ' грн' : null} </span>
      </div>
    </>
  );
}
