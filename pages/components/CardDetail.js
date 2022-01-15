
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CardDetail({ id, title, description, price, url }) {
  const [image, setImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  );
  // const { loading, getOnceGoog, onegood } = useAppContext();
  // const router = useRouter();

  // let arr = router.pathname.split('/');
  useEffect(() => {
    if (url) {
      setImage(url);
    }
  }, [url]);

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
              <sup>&reg; </sup>
            </h2>
            <h2 className="block_name block_name__addName">{title}</h2>

            <p className="block_product__advantagesProduct">
              Wireless headphones with integrated microphone
            </p>

            <div className="block_informationAboutDevice">
              <div className="block_descriptionInformation">
                <span>{description}</span>
              </div>
              <Image src={image} width={300} height={300} alt="logo"></Image>
              <div className="block_price">
                <p className="block_price__currency">{price}</p>
                <p className="block_price__shipping">Shipping and taxes extra</p>
                <button className="button button_addToCard">add to card</button>
              </div>

              <div className="block_goodColor">
                <span className="text_specification">Choose your colors:</span>
                <div className="block_goodColor__allColors">
                  {/* <input
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
                    className="block_goodColor__radio block_goodColor__silver"></label> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
