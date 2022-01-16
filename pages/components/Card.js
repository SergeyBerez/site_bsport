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

    if (cssProps) {
      console.log(' if  goToCardDetail' + router.pathname);
      router.push(`${cssProps}`);
    } else {
      console.log(' else  goToCardDetail' + router.pathname);
      router.push(`${router.pathname}/${id}`);
    }
  };

  useEffect(() => {
    if (url) {
      setImage(url);
      console.log('useEffect   ' + cssProps + 'useEffect   ' + router.pathname);
    }
  }, [url]);
  return (
    <>
      <div
        onClick={goToCardDetail}
        className={!cssProps ? style['productCard_block'] : style['productCard_block-katalog']}>
        {titlePage ? <h5>{titlePage}</h5> : null}
        <Image src={image} width={250} height={300} alt="logo"></Image>
        {title ? <h4 className={style['product-card__title']}>{title}</h4> : null}
        {price ? <div className={style['block_price']}>{price} грн</div> : null}
        {/* <div onClick={goToCardDetail} className={style.block_product}></div> */}
      </div>
    </>
  );
}
