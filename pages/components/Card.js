/*
I want to thank Paul Rudnitskiy for his idea.
If you need full work version you can download it here  https://github.com/BlackStar1991/CardProduct
*/

import { useEffect, useRef } from 'react';

export default function Card({ title, description, price, url }) {
  return (
    <>
      <div className="productCard_block">
        <div className="productCard_rightSide">
          <p className="block_model">
            <span className="block_model__text">Model: </span>
            <span className="block_model__number">505795</span>
          </p>

          <div className="block_product">
            <h2 className="block_name block_name__mainName">
              MOMENTUM<sup>&reg; </sup>
            </h2>
            <h2 className="block_name block_name__addName">Wireless Black</h2>

            <p className="block_product__advantagesProduct">
              Wireless headphones with integrated microphone
            </p>

            <div className="block_informationAboutDevice">
              <div className="block_descriptionInformation">
                <span>
                  Peak performance with active noise cancelation. Sennheiser's new MOMENTUM Wireless
                  - Closed circumauralheadphone featuring wireless technology and NoiseGard Hybrid
                  active noise cancelation
                </span>
              </div>

              <div className="block_price">
                <p className="block_price__currency">$499.95</p>
                <p className="block_price__shipping">Shipping and taxes extra</p>
                <button className="button button_addToCard">Add to Cart</button>
              </div>

              <div className="block_goodColor">
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
              </div>
            </div>
            {/* -------- */}
          </div>
        </div>
      </div>
    </>
  );
}
