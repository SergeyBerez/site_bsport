import { useState } from 'react';

import { useRouter } from 'next/router';
import { useGoodsContext } from '../context/contextGoods';
import BuyPopup from './BuyPopup';
import Accordion from './Accordion';
import arrowNext from '../public/static/img/1904671_arrow_arrow right_change_direction_next_icon.svg';
import arrowPrev from '../public/static/img/1904658_arrow_arrow left_change_direction_left_icon.svg';
import Slider from './Slider';
export default function CardDetail({
  id,
  title,
  description,
  detaileDescription,
  price,
  urlArr,
  color,
}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState('');
  const { state, dispatch } = useGoodsContext();

  const toogleShowModal = (e) => {
    let arrClassNameModal = e.target.className.split(' ');
    let arrClassNameButton = e.target.className.split(' ');
    let arrClassNameClose = e.target.alt;

    let show =
      arrClassNameModal.includes('fixed-overlay') ||
      arrClassNameButton.includes('button') ||
      arrClassNameClose === 'close';
    if (show) {
      setShowModal(!showModal);
      setMassage('');
    }
  };

  const addToCart = () => {
    dispatch({
      type: 'ADD TO CARD',
      payload: {
        id,
        title,
        price,
        urlArr,
        color,
        sum: price,
        cnt: 1,
      },
    });
    router.push('/cart');
  };
  return (
    <>
      <BuyPopup
        urlArr={urlArr}
        id={id}
        showModal={showModal}
        toogleShowModal={toogleShowModal}
        massage={massage}
        setMassage={setMassage}
        orderOneGood={{
          id,
          title,
          description,
          detaileDescription,
          price,
          urlArr,
          color,
        }}></BuyPopup>
      <Slider id={id} urlArr={urlArr} grabCursor={true} pagination={true} count={1}></Slider>{' '}
      <div className="block_product">
        <h1 className="block_product-title">
          <span>{title}</span>
        </h1>
        <p className="block_product__description">{description}</p>
        <div className="block_goodColor">
          <span className="text_specification">колiр : {color}</span>
        </div>
        <div className="block_price">
          <p className="block_price__currency">{price ? price : 'цiну уточнiть'} грн</p>

          <div className="qty_wrapp"></div>
          <div className="block-count">
            {' '}
            <button className="button button-default-white" onClick={addToCart}>
              до корзини
            </button>
            <button className="button button-default-white" onClick={toogleShowModal}>
              купити швидко
            </button>
            <button className="button button-default-white">
              <a href="tel:+380632483200" className="jsx-89893122e891ec04">
                подзвонити
              </a>
            </button>
          </div>
        </div>

        <div className="block_descriptionInformation">
          <Accordion title={'Для оптових покупців'}>
            <div className="phone">
              <p>Сергій</p>
              <a href="tel:+380632483200">+38 (063) 248-32-00</a>
            </div>
            <div className="phone">
              <p>Валентина</p>
              <a href="tel:+380977760954">+38 (097) 776-09-54</a>
            </div>
          </Accordion>
        </div>
        <div className="block_descriptionInformation">
          <Accordion title={'Опис товару'}>
            <p>-{detaileDescription}</p>

            <p>-Ткань турецкая состав: 80 % хлопок 20 % полиэстер</p>
          </Accordion>
        </div>
        <div className="block_descriptionInformation">
          <Accordion title={'Розмірна сітка'}>
            <table
              border="1"
              cellPadding="1"
              cellSpacing="1"
              // style="height:232px;width:414px;"
            >
              <thead>
                <tr>
                  <th scope="col">Розмір</th>
                  <th scope="col">Обхват грудної клітини</th>
                  <th scope="col">Обхват талії</th>
                  <th scope="col">Обхват стегон</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>32/XXS</td>
                  <td>74-77</td>
                  <td>61-63</td>
                  <td>83-85</td>
                </tr>
                <tr>
                  <td>34/XS</td>
                  <td>78-81</td>
                  <td>62-64</td>
                  <td>86-89</td>
                </tr>
                <tr>
                  <td>36/S</td>
                  <td>82-85</td>
                  <td>65-67</td>
                  <td>93-96</td>
                </tr>
                <tr>
                  <td>38/M</td>
                  <td>86-89</td>
                  <td>68-71</td>
                  <td>97-100</td>
                </tr>
                <tr>
                  <td>40/L</td>
                  <td>90-93</td>
                  <td>72-75</td>
                  <td>101-104</td>
                </tr>
                <tr>
                  <td>42/XL</td>
                  <td>94-97</td>
                  <td>76-79</td>
                  <td>105-107</td>
                </tr>
                <tr>
                  <td>44/XXL</td>
                  <td>98-101</td>
                  <td>80-84</td>
                  <td>108-112</td>
                </tr>
                <tr>
                  <td>46/XXXL</td>
                  <td>102-106</td>
                  <td>85-89</td>
                  <td>113-117</td>
                </tr>
              </tbody>
            </table>
          </Accordion>
        </div>
        <div className="block_descriptionInformation">
          <Accordion title={'Доставка'}>
            {' '}
            <p>
              1. Наложка (по предоплате за доставку 100 грн, вычитаем из вычитаем из общей суммы)
            </p>
            <p>
              {' '}
              2. Полная оплата на карту (экономия 40-50 грн, на почте платите только за доставку)
              обмен размера осуществляем по договоренности
            </p>
            <p> 3. Урк почта / Justin / Новая почта</p>
          </Accordion>
        </div>
      </div>
      <style jsx>{`
        .phone a {
          font-weight: 600;
        }

        .block_product__description {
        }
        .block_product-title span {
          font-size: 2rem;
          text-transform: uppercase;
        }
        .block_product-title {
          display: flex;
          flex-direction: column;
          font-weight: 400;
        }
        .block_product {
          overflow: hidden;
          flex: 1;

          display: flex;
          flex-direction: column;
          padding: 0 15px;
          max-width: 700px;
        }
        .block_descriptionInformation {
          align-self: right;
          border-top: 2px solid #888;
        }
        .block-count {
          width: 100%;
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }
        .block_price__currency {
          font-weight: bold;

          font-size: 2.5rem;
        }
        .text_specification {
          font-size: 1.6rem;
        }

        // .qty_wrapp {
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   margin-bottom: 20px;
        // }
        .qty_btn {
          width: 35px;
          position: relative;
          cursor: pointer;
        }

        input {
          border: 0px;
          text-align: center;
          height: 50px;
          width: 40px;
          font-size: 14px;
          color: #1a1a1a;
        }
        .button-default-white {
          width: 45%;
          margin: 0 5px;
          padding: 5px;
          font-size: 1rem;
        }

        @media (min-width: 400px) {
          .button-default-white {
            width: 45%;
            margin: 0 2px;
            font-size: 1.2rem;
            padding: 15px 0;
          }
        }
      `}</style>
    </>
  );
}
