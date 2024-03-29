import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useGoodsContext } from "../context/contextGoods";
import IconClose from "../public/static/img/2703079_close_delete_exit_x_icon.svg";
import { collection, addDoc, doc, getDoc } from "firebase/firestore/lite";
import { useFirebaseContext, db } from "../context/firebaseAuthContext";

export default function BuyPopup({
  showModal,
  setShowModal,
  toogleShowModal,
  massage,
  setMassage,
  urlArr,
  id,

  orderOneGood,
}) {
  const { CurrentUser } = useFirebaseContext();

  const [valueInputsReg, setValueInputReg] = useState({
    name: "",
    phone: "",
  });

  const addOrder = async (e) => {
    e.preventDefault();
    ("");
    try {
      const docRef = await addDoc(collection(db, "order"), {
        name: CurrentUser?.displayName || valueInputsReg.name,
        phone: valueInputsReg.phone,
        urlArr: urlArr || "",
        id: id || "",
        // user: CurrentUser?.displayName || "",
        // orderGoods,
      });
      const docRefone = await doc(db, "order", docRef.id);
      const docSnap = await getDoc(docRefone);
      // state.cart.length = 0;
      if (docSnap.exists()) {
        setMassage(docSnap.data().name);
      } else {
        // doc.data() will be undefined in this case
        console.log("error not user order");
      }
      // localStorage.removeItem("CART");
      setTimeout(() => {
        setShowModal(!showModal);
      }, 2000);
      setValueInputReg({ ...valueInputsReg, name: "", phone: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const onHandlerInputReg = (e) => {
    const value = e.target.value;
    const name = e.target.id;

    setValueInputReg({ ...valueInputsReg, [name]: value });

    // Validate(valueInputs.email, valueInputs.password);
  };

  return (
    <>
      <div className={"fixed-overlay " + showModal} onClick={toogleShowModal}>
        <div className={"modal " + showModal}>
          <div className="modal_container">
            {massage !== "" ? (
              <>
                <div className="form-login-block-close">
                  {" "}
                  <span className="form-login-block-left">
                    <Image
                      onClick={toogleShowModal}
                      src={IconClose}
                      width={10}
                      height={10}
                      alt="close"
                    ></Image>
                  </span>
                </div>
                <h5>
                  Дякуємо за замовлення <span>{massage}</span>
                  <p>Чекайте дзвінка. Гарного дня!</p>
                </h5>
              </>
            ) : (
              <form
                onSubmit={addOrder}
                className="form form-login"
                id="regist-form"
              >
                <div className="form-login-block-close">
                  {" "}
                  <span className="form-login-block-left">
                    <Image
                      onClick={toogleShowModal}
                      src={IconClose}
                      width={10}
                      height={10}
                      alt="close"
                    ></Image>
                  </span>
                </div>
                {CurrentUser?.displayName ? CurrentUser.displayName : null}
                <fieldset
                  className="fieldset login"
                  data-hasrequired="* Обязательные поля"
                >
                  <div className="field name required">
                    {CurrentUser?.displayName ? null : (
                      <>
                        {" "}
                        <label className="label" htmlFor="name">
                          <span>Iмя :</span>
                        </label>{" "}
                        <div className="control">
                          <input
                            required
                            onChange={onHandlerInputReg}
                            name="login[username]"
                            value={valueInputsReg.name}
                            autoComplete="on"
                            id="name"
                            type="text"
                            className={"input-text"}
                            title="Name"
                          ></input>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="field tel required">
                    <label className="label" htmlFor="tel">
                      <span>Телефон :</span>
                    </label>{" "}
                    <div className="control">
                      <input
                        onChange={onHandlerInputReg}
                        name="login[tel]"
                        value={valueInputsReg.phone}
                        autoComplete="on"
                        id="phone"
                        type="tel"
                        className={"input-text"}
                        title="Phone"
                      ></input>
                    </div>
                  </div>

                  <div className="actions-toolbar">
                    <div className="primary">
                      <button className="action login primary" type="submit">
                        <span>купити</span>
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal_container h5 {
          text-align: center;
        }
        .fixed-overlay.false {
          display: none;
          position: fixed;
          overflow: auto;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }
        .fixed-overlay.true {
          display: block;
          position: fixed;
          overflow: auto;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }
        .modal {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .modal.false {
          display: none;
        }

        .modal_container {
          background-color: #fff;
          width: 350px;
          height: 250px;
          padding: 20px;
        }
        .form-login-block-close {
          text-align: right;
        }
        .form-login-block-left {
          cursor: pointer;
        }
        .field {
          margin: 0 0 25px;
          line-height: 1;
        }
        .fieldset {
          border: 0;
          margin: 0 0 44px;
          padding: 0;
          letter-spacing: -0.31em;
        }
        .label {
          margin: 0 0 14px;
          color: #323232;
          letter-spacing: 0.1rem;
          font-style: normal;
          font-weight: 300;
          line-height: 1;
          font-size: 1.5rem;
        }
        .label:after {
          content: " *";
          color: #000;
          font-size: 1.4rem;
          margin: 0 0 0 1px;
        }

        .input-text {
          border: 1px solid #cbcbcb;
          border-radius: 0;
          color: #323232;
          background: #f7f7f7;
          font-family: LabGrotesque;
          font-size: 14px;
          font-weight: 300;
          height: 32px;
          line-height: 1.42857143;
          padding: 0 11px;
          vertical-align: baseline;
          width: 100%;
          box-sizing: border-box;
        }

        .actions-toolbar {
          padding-top: 3px;
        }

        .action.primary {
          border: 2px solid #000;
          width: 100%;
          color: #fff;
          background-color: #000;
          font-weight: 900;
          padding: 16px 32px 14px;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          cursor: pointer;
          font-size: 1.2rem;
        }
        .action.primary:hover {
          background: #444;
          border: 2px solid #000;
          color: #fff;
        }
      `}</style>
    </>
  );
}
