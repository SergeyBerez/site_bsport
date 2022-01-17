/*
I want to thank Paul Rudnitskiy for his idea.
If you need full work version you can download it here  https://github.com/BlackStar1991/CardProduct
*/
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './cardsStyle.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Detail from '../components/detail';
export default function Card({ id, title, description, price, url, titlePage, cssProps }) {
  const router = useRouter();
  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  );

  const goToCardDetail = (e) => {
    e.stopPropagation();
    router.push(`${router.pathname}/${id}`);
  };

  useEffect(() => {
    console.log('useEffect ' + router.pathname, id);
    if (url) {
      setImage(url);
    }
  }, [url]);
  return (
    <>
      <div onClick={goToCardDetail} className={style['productCard_block']}>
        <Image src={image} width={250} height={300} alt="logo"></Image>
        <h4 className={style['product-card__title']}>{title}</h4>
        <div className={style['block_price']}>{price}грн</div>
        {/* <div onClick={goToCardDetail} className={style.block_product}></div> */}
      </div>
    </>
  );
}
