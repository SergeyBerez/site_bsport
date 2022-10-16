import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGoodsContext } from "../context/contextGoods";
import Link from "next/link";
import BuyPopup from "../components/BuyPopup";
import LinkIcon from "../public/static/img/link_icon.svg";
import arrowNext from "../public/static/img/4781840_+_add_circle_create_expand_icon.svg";
import remove from "../public/static/img/2931168_bin_delete_remove_trash_garbage_icon.svg";
import arrowPrev from "../public/static/img/4781841_-_cancel_circle_collapse_min_icon.svg";

import MainLayout from "../components/MainLayout";
export default function Cart() {
  const { state, countGoodsPlus, countGoodsMinus, deleteFromCart, dispatch } =
    useGoodsContext();

  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");
  const [localGoods, setLocalGoods] = useState([]);

  const toogleShowModal = (e) => {
    let arrClassNameModal = e.target.className.split(" ");
    let arrClassNameButton = e.target.className.split(" ");
    let arrClassNameClose = e.target.alt;

    let show =
      arrClassNameModal.includes("fixed-overlay") ||
      arrClassNameButton.includes("button") ||
      arrClassNameClose === "close";
    if (show) {
      setShowModal(!showModal);
      setMassage("");
    }
  };

  return (
    <MainLayout>
      <h1 className="title-product-block">Корзина</h1>
      {state.cart.length === 0 ? (
        <>
          <h2 className="title-product-block">Ваша корзина пуста</h2>
          <div className="link-back">
            <Link href="/">
              <a>
                <span className="span">в каталог</span>{" "}
                <Image
                  width={20}
                  height={20}
                  src={LinkIcon}
                  alt="photo"
                ></Image>
              </a>
            </Link>
          </div>
        </>
      ) : (
        <>
          <BuyPopup
            showModal={showModal}
            toogleShowModal={toogleShowModal}
            massage={massage}
            setMassage={setMassage}
            orderGoods={state.cart}
            setShowModal={setShowModal}
          ></BuyPopup>{" "}
          {state.cart.map((item, i) => {
            return (
              <div className="cart-item_section" key={i}>
                <Image
                  alt={"pant"}
                  width={150}
                  height={200}
                  src={item?.urlArr[0]}
                ></Image>
                <div className="flex-wrap-section-right">
                  <div className="cart-item_header">{item.title}</div>
                  <div className="cart-item-block">
                    <div className="block-infoDetail">
                      {/* <div className="cart-item_table-column">
                        <div className="table-header-column">цвет&nbsp;:</div>{" "}
                        <div className="textBold">{item.color}</div>
                      </div> */}
                      <div className="cart-item_table-column">
                        {" "}
                        <div className="table-header-column">
                          количество&nbsp;:
                        </div>
                        <div className="qty_wrapp">
                          <div
                            className="qty_btn bnt_minus"
                            onClick={() => {
                              countGoodsMinus({
                                ...item,
                                cnt: item.cnt,
                              });
                            }}
                          >
                            <Image
                              src={arrowPrev}
                              width={20}
                              height={20}
                              alt="arrow"
                            ></Image>
                          </div>
                          <input
                            className="input-quantity"
                            type="text"
                            value={item.cnt}
                            readOnly
                          />

                          <div
                            className="qty_btn bnt_plus"
                            onClick={() => {
                              countGoodsPlus({
                                ...item,
                                cnt: item.cnt,
                              });
                            }}
                          >
                            <Image
                              src={arrowNext}
                              width={20}
                              height={20}
                              alt="arrow"
                            ></Image>
                          </div>
                        </div>
                      </div>
                      <div className="cart-item_table-column">
                        <div className="table-header-column">цiна&nbsp;:</div>{" "}
                        <div className="textBold">{item.price}</div>
                      </div>
                      <div className="cart-item_table-column">
                        <div className="table-header-column">
                          загалом&nbsp;:
                        </div>{" "}
                        <div className="textBold">{item.sum}</div>
                      </div>
                      <div className="cart-item_table-column">
                        <div className="table-header-column">
                          видалити&nbsp;:
                        </div>{" "}
                        <div
                          className="textBold-delete"
                          onClick={() => {
                            deleteFromCart(item);
                          }}
                        >
                          <Image
                            src={remove}
                            width={20}
                            height={20}
                            alt="remove"
                          ></Image>
                        </div>
                      </div>
                    </div>
                    {/* <div className="block_price">
                      {" "}
                      <div className="cart-item_table-column">
                        <div className="table-header-column">цiна&nbsp;:</div>{" "}
                        <div className="textBold">{item.price}</div>
                      </div>
                      <div className="cart-item_table-column">
                        <div className="table-header-column">
                          загалом&nbsp;:
                        </div>{" "}
                        <div className="textBold">{item.sum}</div>
                      </div>
                    </div> */}
                    {/* <div className="block_delete">
                      
                    </div> */}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="cart-item_section-total">
            <div className="cart-item_table-column">
              <h2 className="title-product-block">
                Загалом&nbsp;:&nbsp;
                <span className="textBold">
                  {state.cart.reduce((sum, item) => {
                    return sum + item.sum;
                  }, 0)}
                </span>
                &nbsp;грн
              </h2>{" "}
            </div>
            <button
              onClick={toogleShowModal}
              className="button button-default-white"
            >
              купити
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .cart-item_section {
          width: 100%;
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;

          border-bottom: 1px solid #e6e6e6;
          padding: 10px 0;
        }

        .flex-wrap-section-right {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
        .link-back {
          margin-top: 50px;
          width: 100%;
          text-align: center;
          display: flex;
          align-items: center;
          cursor: pointer;
          justify-content: center;
        }
        .link-back a {
          display: flex;
          align-items: center;
        }
        .span {
          font-size: 1.8rem;
          margin-right: 5px;
        }
        .textBold-delete {
          cursor: pointer;
        }
        .table-header {
          width: 100%;
        }

        .textBold {
          font-weight: 600;
        }

        .cart-item-block {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }

        .cart-item_header {
          margin: 10px 0;
          width: 100%;
          text-align: center;
        }
        .block-infoDetail {
          display: flex;

          width: 100%;
        }
        .cart-item_table-column {
          margin: 10px;
          text-align: center;
          width: 100%;
        }
        .table-header-column {
          font-size: 1.2rem;
          margin: 10px;
          color: #000;
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
          width: 200px;
          padding: 15px;
        }
        .cart-item_section-total {
          margin: 0 10px;
          border-bottom: 1px solid #e6e6e6;
        }
        @media (min-width: 460px) {
          .cart-item_section {
            flex-wrap: nowrap;
          }
        }
        @media (min-width: 760px) {
          .block-infoDetail {
            justify-content: space-around;
            display: flex;
            align-items: center;
            width: 100%;
          }
        }
      `}</style>
    </MainLayout>
  );
}
