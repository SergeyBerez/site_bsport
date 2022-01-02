/*
I want to thank Paul Rudnitskiy for his idea.
If you need full work version you can download it here  https://github.com/BlackStar1991/CardProduct
*/

import { useEffect, useRef } from 'react';
import style from '/pages/components/Slider.module.css';
export default function Slider() {
  const refSlider = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onload = function () {
        //// SLIDER

        var slider = document.querySelectorAll('.sliderBlock_items');

        var slides = document.querySelectorAll('.sliderBlock_items__itemPhoto');

        var next = document.querySelectorAll('.sliderBlock_controls__arrowForward')[0];

        var previous = document.querySelectorAll('.sliderBlock_controls__arrowBackward')[0];
        var items = document.querySelectorAll('.sliderBlock_positionControls')[0];
        var currentSlideItem = document.querySelector(
          '.sliderBlock_positionControls__paginatorItem',
        );

        var currentSlide = 0;
        var slideInterval = setInterval(nextSlide, 5000); /// Delay time of slides

        function nextSlide() {
          goToSlide(currentSlide + 1);
        }

        function previousSlide() {
          goToSlide(currentSlide - 1);
        }

        function goToSlide(n) {
          slides[currentSlide].className = 'sliderBlock_items__itemPhoto';
          items.children[currentSlide].className = 'sliderBlock_positionControls__paginatorItem';
          currentSlide = (n + slides.length) % slides.length;
          slides[currentSlide].className =
            'sliderBlock_items__itemPhoto sliderBlock_items__showing';
          items.children[currentSlide].className =
            'sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active';
        }

        next.onclick = function () {
          nextSlide();
        };
        previous.onclick = function () {
          previousSlide();
        };

        function goToSlideAfterPushTheMiniBlock() {
          for (var i = 0; i < currentSlideItem.length; i++) {
            currentSlideItem[i].onclick = function (i) {
              var index = Array.prototype.indexOf.call(currentSlideItem, this);
              goToSlide(index);
            };
          }
        }

        goToSlideAfterPushTheMiniBlock();
      };
    }
  }, []);

  return (
    <div>
      <main className="main">
        <div className="container">
          <div className="productCard_block">
            <div className="sliderBlock">
              <ul className="sliderBlock_items" ref={refSlider}>
                <li className="sliderBlock_items__itemPhoto sliderBlock_items__showing">
                  <img
                    src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones1.png?raw=true"
                    alt="headphones"
                  />
                </li>
                <li className="sliderBlock_items__itemPhoto">
                  <img
                    src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones2.png?raw=true"
                    alt="headphones"
                  />
                </li>
                <li className="sliderBlock_items__itemPhoto">
                  <img
                    src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true"
                    alt="headphones"
                  />
                </li>
                <li className="sliderBlock_items__itemPhoto">
                  <img
                    src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true"
                    alt="headphones"
                  />
                </li>
                <li className="sliderBlock_items__itemPhoto">
                  <img
                    src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true"
                    alt="headphones"
                  />
                </li>
              </ul>

              <div className={style.sliderBlock_controls}>
                <div className="sliderBlock_controls__navigatin">
                  <div className="sliderBlock_controls__wrapper">
                    <div className="sliderBlock_controls__arrow sliderBlock_controls__arrowBackward">
                      <i className="fa fa-angle-left" aria-hidden="true"></i>
                    </div>
                    <div className="sliderBlock_controls__arrow sliderBlock_controls__arrowForward">
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>

                <ul className="sliderBlock_positionControls">
                  <li className="sliderBlock_positionControls__paginatorItem sliderBlock_positionControls__active"></li>
                  <li className="sliderBlock_positionControls__paginatorItem"></li>
                  <li className="sliderBlock_positionControls__paginatorItem"></li>
                  <li className="sliderBlock_positionControls__paginatorItem"></li>
                  <li className="sliderBlock_positionControls__paginatorItem"></li>
                </ul>
              </div>
            </div>

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
                      Peak performance with active noise cancelation. Sennheiser's new MOMENTUM
                      Wireless - Closed circumauralheadphone featuring
                      <a className="block_product__link" href="#">
                        Bluetooth<sup>&reg;</sup>
                      </a>
                      wireless technology and NoiseGard Hybrid active noise cancelation
                    </span>
                  </div>

                  <div className="block_price">
                    <p className="block_price__currency">$499.95</p>
                    <p className="block_price__shipping">Shipping and taxes extra</p>
                    <button className="button button_addToCard">Add to Cart</button>
                  </div>

                  <div className="block_goodColor">
                    <span className="text_specification">Choose your colors:</span>
                    {/* <div className="block_goodColor__allColors">
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
                      </div> */}
                  </div>
                </div>
                {/* -------- */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
