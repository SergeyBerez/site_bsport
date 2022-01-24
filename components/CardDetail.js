import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from './Slider';
export default function CardDetail({
  id,
  title,
  description,
  detaileDescription,
  price,
  url,
  urlArr,
  color,
}) {
  // let arr = router.pathname.split('/');

  return (
    <>
      {/* <div className="slider-wrapper"></div> */}
      <Slider id={id} url={urlArr} grabCursor={true}></Slider>{' '}
      <div className="block_product">
        <p className="block_model">
          <span className="block_model__text">Model: </span>
          <span className="block_model__number">505795</span>
        </p>

        <h2 className="block_name block_name__mainName">
          <sup>&reg; </sup>
        </h2>
        <h2 className="block_name block_name__addName">{title}</h2>

        <p className="block_product__advantagesProduct">{description}</p>

        <Image src={url} width={300} height={400} alt="logo"></Image>

        <div className="block_goodColor">
          <span className="text_specification">цвет :{color}</span>
          <div className="block_goodColor__allColors">
            <input
              type="radio"
              name="colorOfItem"
              className="radio_button"
              id="radioColor"
              checked
            />
            <label
              htmlfor="radioColor"
              className={`block_goodColor__radio block_goodColor__${color}`}></label>
            <input type="radio" name="colorOfItem" className="radio_button" id="radioColor2" />
          </div>
        </div>
        <div className="block_descriptionInformation">
          <span>{detaileDescription}</span>

          <p>-материал двухнитка пенье</p>
          <p> -молодёжный покрой зауженные</p>
          <p>-Ткань турецкая состав: 80 % хлопок 20 % полиэстер</p>
          <p> -Штаны на манжетах, глубокие карманы на молнии</p>
        </div>
        <div className="block_descriptionInformation">
          <p>
            <strong> Варианты оплаты и отправок: </strong>
            <p>
              1. Наложка (по предоплате за доставку 100 грн, вычитаем из вычитаем из общей суммы)
            </p>
            <p>
              {' '}
              2. Полная оплата на карту (экономия 40-50 грн, на почте платите только за доставку)
              обмен размера осуществляем по договоренности
            </p>
            <p> 3. Урк почта / Justin / Новая почта</p>
          </p>
        </div>

        <div className="block_price">
          <p className="block_price__currency">{price ? price : 'цiну уточнiть'}</p>
          <p className="block_price__shipping">Shipping and taxes extra</p>

          <button className="button button_addToCard">add to card</button>
        </div>
      </div>
      <style jsx>{`
        .block_product {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 5px;
          max-width: 350px;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
}
