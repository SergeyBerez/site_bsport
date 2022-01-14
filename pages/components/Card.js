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
export default function Card({ id, title, description, price, url }) {
  const router = useRouter();
  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  );

  const goToCardDetail = (e) => {
    e.stopPropagation();
    router.push(`${router.pathname}/${id}`);
  };

  useEffect(() => {
    if (url) {
      setImage(url);
    }
  }, [url]);
  return (
    <>
      <div className={style.productCard_block}>
        <p className="block_model">
          <span className="block_model__text">Model: </span>
          <span className="block_model__number">505795</span>
        </p>

        <div className={style.block_product}>
          <h2 className="block_name block_name__mainName">{title}</h2>
          <h2 className="block_name block_name__addName">Wireless Black</h2>

          <p className="block_product__advantagesProduct">
            Wireless headphones with integrated microphone
          </p>

          <div className={style.block_descriptionInformation}>
            <span>{description}</span>
          </div>
          {/* <img src={image}></img> */}

          <Image src={image} width={300} height={300} alt="logo"></Image>
          <div className="block_price">
            <p className="block_price__currency">{price}</p>
            <p className="block_price__shipping">Shipping and taxes extra</p>
          </div>
          {/* <div className="block_goodColor">
            <span className="text_specification">Choose your colors:</span>
            <div className="block_goodColor__allColors">
              <input
                    type="radio"
                    name="colorOfItem"
                    className="radio_button"
                    id="radioColor"
                    checked
                  />
                  <label
                    htmlFor="radioColor"
                    className="block_goodColor__radio block_goodColor__black"></label>
                  <input
                    type="radio"
                    name="colorOfItem"
                    className="radio_button"
                    id="radioColor2"
                  />
                  <label
                    htmlFor="radioColor2"
                    className="block_goodColor__radio block_goodColor__silver"></label>
            </div>
          </div> */}

          {/* <button className={style.button_addToCard} onClick={goToCardDetail}>
            подробно...
           
          </button> */}

          <Detail onClick={goToCardDetail} v={'подробно...'}></Detail>
        </div>
      </div>
    </>
  );
}
