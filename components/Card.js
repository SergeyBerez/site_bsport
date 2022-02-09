/*
I want to thank Paul Rudnitskiy for his idea.
If you need full work version you can download it here  https://github.com/BlackStar1991/CardProduct
*/
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './card.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
// import Detail from './ButtonDetail';
export default function Card({ id, title, description, price, url, titlePage, cssProps }) {
  const router = useRouter();
  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  );

  const goToCardDetail = (e) => {
    console.log('gotodtail' + id);
    e.stopPropagation();
    router.push(`${router.pathname}/${id}`);
  };

  useEffect(() => {
    // console.log('useEffect ' + router.pathname, id);
    if (url) {
      setImage(url);
    }
  }, [url]);
  return (
    <>
      <div onClick={goToCardDetail} className={style['productCard_block']}>
        <Image src={image} width={300} height={400} alt="logo"></Image>

        <div className={style['product-card__title']}>{title}</div>
        <span className={style['block_price']}>{price ? price + ' грн' : null} </span>
      </div>
    </>
  );
}
