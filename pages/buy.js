import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import { collection, addDoc, doc, getDoc } from "firebase/firestore/lite";
import { db } from "../context/firebaseContext";
export default function buy() {
  const [massage, setMassage] = useState("");
  const [valueInputsReg, setValueInputReg] = useState({
    name: "",
    phone: "",
  });
  const addOrder = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "order"), {
        name: valueInputsReg.name,
        phone: valueInputsReg.phone,
      });
      const docRefone = await doc(db, "order", docRef.id);
      const docSnap = await getDoc(docRefone);

      if (docSnap.exists()) {
        setMassage(docSnap.data().name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
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
    <MainLayout>
      {massage !== "" ? (
        <>
          <h5>Дякуємо ми скоро вам передзвонимо</h5>
          <span>{massage}</span>
        </>
      ) : (
        <div className="block-content">
          <form
            onSubmit={addOrder}
            className="form form-login"
            id="regist-form"
          >
            <fieldset
              className="fieldset login"
              data-hasrequired="* Обязательные поля"
            >
              <div className="field name required">
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
        </div>
      )}

      <style jsx>{`
        .social_block .title {
          font-size: 1.4rem;
          text-align: center;
          color: #1a1a1a;
          margin-top: 35px;
        }

        .social_block {
          border-top: 1px solid #ccc;
        }
        .title-product-block {
          flex-grow: 0;
          margin: 0px;
        }
        p {
          margin: 0;
          font-size: 2rem;
          letter-spacing: 0.5rem;
          text-transform: capitalize;
        }
        .button-default-white {
          display: flex;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          text-transform: none;
          font-size: 1.6rem;
        }
        span {
          margin-right: 5px;
        }
        .block-logIn {
          padding: 0 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 300px;
          flex-grow: 1;
          max-width: 400px;
          text-align: center;
        }
        .h2 {
        }
        .social_block {
          width: 100%;
        }
        .title {
          font-size: 1.4rem;
          text-align: center;
          color: #1a1a1a;
          margin-bottom: 35px;
        }
        .wrapp_btn {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .soc_btn {
          border: 0px;
          border-radius: 0px;
          background: transparent;
          margin: 0px 5px;
          color: black;
        }
        .block-customer-login {
          width: 100%;
          display: flex;
          flex-direction: column;
          display: none;
          background: #f7f7f7;
        }
        .block-customer-login.right {
          padding-left: 0px;
        }
        .block-customer-login.left {
          padding-right: 0px;
          border-right: none;
        }
        .block-customer-login.activeMobileContent {
          display: block;
        }

        .block-content {
          margin-top: auto;
        }

        .block-title {
          width: 50%;
          color: #323232;
          padding: 15px 5px;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          font-size: 1.5rem;
          cursor: pointer;
          margin-top: 10px;
          text-align: center;
        }
        .block-title.active {
          background: #f7f7f7;
        }
        .form {
          display: block;
          margin-top: 0em;
        }
        .form form-login {
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

        .primary {
          width: 100%;
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
        .input-text.disabled {
          border: 1px solid red;
        }

        @media (min-width: 700px) {
          .block-customer-login {
            width: 40%;
            display: block;

            background-color: transparent;
          }
          .block-customer-login.activeMobileContent {
            background-color: transparent;
          }
          .block-customer-login.right {
            padding-left: 54.5px;
          }
          .block-customer-login.left {
            padding-right: 54.5px;
            border-right: 1px solid #d2d2d2;
          }
          .block-title.active {
            background-color: transparent;
          }
          .input-text {
            background-color: transparent;
          }
        }
      `}</style>
    </MainLayout>
  );
}
