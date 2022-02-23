import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGoodsContext } from '../context/contextGoods';
import Link from 'next/link';
import LinkIcon from '../public/static/img/link_icon.svg';
import arrowNext from '../public/static/img/4781840_+_add_circle_create_expand_icon.svg';
import remove from '../public/static/img/2931168_bin_delete_remove_trash_garbage_icon.svg';
import arrowPrev from '../public/static/img/4781841_-_cancel_circle_collapse_min_icon.svg';

import MainLayout from '../components/MainLayout';
export default function Cart() {
  const { state, countGoodsPlus, countGoodsMinus, deleteFromCart } = useGoodsContext();
  console.log(!state.cart.length === 0);

  // const countGoodsMinus = (item, value) => {
  //   dispatch({
  //     type: 'MINUS',
  //     payload: { ...item, cnt: value },
  //   });
  // };
  // const countGoodsPlus = (item, value) => {
  //   console.log(value);
  //   dispatch({
  //     type: 'PLUS',
  //     payload: { ...item, cnt: value },
  //   });
  // };

  return (
    <MainLayout>
      <h1 className="title-product-block">Корзина</h1>
      {state.cart.length === 0 ? (
        <>
          <h2 className="title-product-block">Ваша корзина пуста</h2>
          <Link href="/">
            <a className="a">
              <span className="span">в каталог</span>{' '}
              <Image width={20} height={20} src={LinkIcon} alt="logo"></Image>
            </a>
          </Link>
        </>
      ) : (
        <>
          <div className="cart-item_section-left">
            {' '}
            {state.cart.map((item, i) => {
              return (
                <div className="cart-item_section" key={i}>
                  <Image alt={'pant'} width={150} height={200} src={item.url}></Image>
                  <div className="cart-item-block">
                    <div className="cart-item_header">{item.title}</div>

                    <div className="block-infoDetail">
                      <div className="cart-item_table-column">
                        <div className="table-header-column">цвет&nbsp;:</div>{' '}
                        <div className="textBold">{item.color}</div>
                      </div>
                      <div className="cart-item_table-column">
                        {' '}
                        <div className="table-header-column">количество&nbsp;:</div>
                        <div className="qty_wrapp">
                          <div
                            className="qty_btn bnt_minus"
                            onClick={() => {
                              countGoodsMinus({
                                ...item,
                                cnt: item.cnt ? item.cnt : 0,
                              });
                            }}>
                            <Image src={arrowPrev} width={20} height={20} alt="arrow"></Image>
                          </div>
                          <input
                            className="input-quantity"
                            type="text"
                            value={item.cnt ? item.cnt : 0}
                            readOnly
                          />

                          <div
                            className="qty_btn bnt_plus"
                            onClick={() => {
                              countGoodsPlus({
                                ...item,
                                cnt: item.cnt ? item.cnt : 0,
                              });
                            }}>
                            <Image src={arrowNext} width={20} height={20} alt="arrow"></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block_price">
                      {' '}
                      <div className="cart-item_table-column">
                        <div className="table-header-column">цiна&nbsp;:</div>{' '}
                        <div className="textBold">{item.price}</div>
                      </div>
                      <div className="cart-item_table-column">
                        <div className="table-header-column">загалом&nbsp;:</div>{' '}
                        <div className="textBold">{item.sum}</div>
                      </div>
                    </div>
                    <div className="cart-item_table-column">
                      <div className="table-header-column">видалити&nbsp;:</div>{' '}
                      <div
                        className="textBold-delete"
                        onClick={() => {
                          deleteFromCart({ ...item });
                        }}>
                        <Image src={remove} width={20} height={20} alt="remove"></Image>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-item_section-buy">
            <div className="cart-item_table-column">
              <h2 className="title-product-block">всего&nbsp;:</h2>{' '}
              <div className="textBold">
                {state.cart.reduce((sum, item) => {
                  return sum + item.sum;
                }, 0)}
              </div>
            </div>
            <button className="button button-default-white">купити</button>
          </div>
        </>
      )}

      <style jsx>{`
        .a {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .span {
          font-size: 1.8rem;
          margin-right: 5px;
          line-height: 1;
        }
        .textBold-delete {
          cursor: pointer;
        }
        .table-header {
          width: 100%;
        }
        .cart-item_section-left {
          width: 80%;
        }
        .textBold {
          font-weight: 600;
        }
        .cart-item_section {
          width: 100%;
          display: flex;
          justify-content: space-around;
          // flex-wrap: wrap;
          align-items: center;
          border-bottom: 1px solid #e6e6e6;
          padding: 10px 0;
        }
        .cart-item_section-buy {
          width: 100%;
          margin: 0 10px;
          border-bottom: 1px solid #e6e6e6;
        }
        .cart-item-block {
          flex-grow: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
        }
        .cart-item_header {
          margin: 10px 0;
          width: 100%;
          text-align: center;
        }
        .table-header-column {
          font-size: 1.2rem;
          margin: 5px 0;

          color: #000;
        }
        .block-infoDetail,
        .block_price {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
        }
        .cart-item_table-column {
          margin-bottom: 20px;
          text-align: center;
          width: 100%;
          // border-top: 1px solid #e6e6e6;
          // max-width: 260px;
          // min-width: 160px;
        }
        .block_product {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 5px;
          max-width: 700px;
          justify-content: space-around;
          min-width: 300px;
        }
        .block-count {
          width: 100%;
          display: flex;
          justify-content: space-around;
        }
        .block_price__currency {
          font-weight: bold;
          color: green;
          font-size: 2 rem;
        }
        .text_specification {
          font-size: 1.6rem;
        }
        .block_descriptionInformation {
          margin-top: 20px;
        }
        .qty_wrapp {
          // border: 1px solid #e6e6e6;
          min-width: 80px;
          display: flex;

          justify-content: center;
          align-items: center;
        }
        .qty_btn {
          cursor: pointer;
        }

        .input-quantity {
          border: none;
          text-align: center;
          width: 50px;
          font-size: 14px;
          color: #1a1a1a;
          font-weight: 600;
        }
        .button-default-white {
          padding: 5px 0;
        }

        @media (min-width: 360px) {
          .cart-item-block {
            width: 100%;
          }
          .cart-item_table-column {
            // margin-bottom: 20px;
            width: 30%;
            margin: 10px;
          }
          .block_price,
          .block-infoDetail {
            width: 100%;
            flex-wrap: nowrap;
          }
        }
        @media (min-width: 570px) {
          .cart-item-block {
            width: 0%;
          }
          .cart-item_table-column {
            width: 60%;
            margin: 20px;
          }
          .block_price,
          .block-infoDetail {
            width: 60%;
            flex-wrap: nowrap;
          }
          .cart-item_section-buy {
            top: 120px;
            right: 0;
            position: fixed;
            width: 15%;
            margin: 0 10px;
            border-bottom: 1px solid #e6e6e6;
            background-color: white;
          }
        }

        @media (min-width: 980px) {
          .block_price,
          .block-infoDetail {
            width: 30%;
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </MainLayout>
  );
}
