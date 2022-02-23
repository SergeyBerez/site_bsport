import { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/MainLayout';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import LinkSvg from '../public/static/img/link_icon.svg';
import GoogleSvg from '../public/static/img/1298745_google_brand_branding_logo_network_icon.svg';
import FacebookSvg from '../public/static/img/3225194_app_facebook_logo_media_popular_icon.svg';

import Image from 'next/image';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore/lite';

import { useAppContext, db, auth } from '../context/firebaseContext';
export default function Registration() {
  const router = useRouter();
  const { setCurrentUser, uidUser, CurrentUser } = useAppContext();
  const [disabled, setDisbled] = useState('true');
  const [active, setActive] = useState('active');

  const [massage, setMassage] = useState('');
  const [valueInputsReg, setValueInputReg] = useState({
    email: '',
    password: '',
    text: '',
  });
  const [valueInputsLogIn, setValueInputLogIn] = useState({
    email: '',
    password: '',
  });
  const [massageForLogIn, setMassageForLogIn] = useState('');
  // const Validate = (email, password) => {
  //   if (email == '' || password.length <= 4) {
  //     setDisbled('disabled');
  //     return true;
  //   } else {
  //     setDisbled('');
  //     return false;
  //   }
  // };

  const toggleTab = () => {
    setActive('active');
  };
  const toggleTabRight = () => {
    setActive('');
  };
  const onHandlerInputReg = (e) => {
    const value = e.target.value;
    const name = e.target.type;
    setValueInputReg({ ...valueInputsReg, [name]: value });
    // Validate(valueInputs.email, valueInputs.password);
  };
  const onHandlerInputLogIn = (e) => {
    const value = e.target.value;
    const name = e.target.type;
    setValueInputLogIn({ ...valueInputsLogIn, [name]: value });
    // Validate(valueInputsLogIn.email, valueInputsLogIn.password);
  };

  function createUser(e) {
    e.preventDefault();
    console.log('createUser');
    // if (Validate()) {
    //   return;
    // }
    createUserWithEmailAndPassword(auth, valueInputsReg.email, valueInputsReg.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        setMassage('ви уcпiшно зареэструвались');
        setDisbled(true);

        return user.uid;
      })
      .then((id) => {
        // addDoc(collection(db, 'users'), {
        //   name: valueInputsReg.text,
        //   email: valueInputsReg.email,
        //   id: id,
        // });
        setDoc(doc(db, 'users', id), {
          name: valueInputsReg.text,
          email: valueInputsReg.email,
          id: id,
          time: Timestamp.fromDate(new Date()),
        });

        setCurrentUser({
          name: valueInputsReg.text,
          email: valueInputsReg.email,
          id: id,
          time: Timestamp.fromDate(new Date()),
        });
        setValueInputReg({ ...valueInputsReg, password: '', email: '', text: '' });
        // Add a new document in collection "cities"
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/weak-password') {
          setMassage('слабий пароль');
        } else if (errorCode === 'auth/email-already-in-use') {
          setMassage('такий акаунт вже iснуе');
        } else {
          console.log(errorMessage);
        }
      });
  }
  const LogInUser = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        valueInputsLogIn.email,
        valueInputsLogIn.password,
      );
      const id = userCredential.user.uid;
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      setCurrentUser(docSnap.data());

      setMassageForLogIn('ви уcпiшно ввiйшли ' + CurrentUser);
      setDisbled(true);
      setValueInputLogIn({ ...valueInputsLogIn, password: '', email: '' });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode === 'auth/internal-error') {
        setMassageForLogIn('введiть пароль');
      } else if (errorCode === 'auth/wrong-password') {
        setMassageForLogIn('такий пароль не icнуэ');
      } else if (errorCode === 'auth/invalid-email') {
        setMassageForLogIn('введiть пошту');
      } else if (errorCode === 'auth/user-not-found') {
        setMassageForLogIn('такого користувача не iснуе');
      } else {
        console.log(errorMessage);
      }
    }
  };
  const LogOut = () => {
    auth.signOut();
    setCurrentUser(null);
    setMassageForLogIn('');
  };
  const goToMainPage = () => {
    router.push('/');
  };
  const goToCart = () => {
    router.push('/cart');
  };

  return (
    <MainLayout>
      {!uidUser ? (
        <>
          <div
            // className={`block-title ${active}`}
            onClick={toggleTab}
            className={active ? 'block-title active' : 'block-title'}>
            Маю Акаунт
          </div>
          <div
            // className={`block-title ${active1}`}
            onClick={toggleTabRight}
            className={!active ? 'block-title active' : 'block-title'}>
            Новий клиент
            {massage ? massage : null}
          </div>
          <div
            className={
              active ? 'block-customer-login left activeMobileContent' : 'block-customer-login left'
            }>
            <span>{massageForLogIn ? massageForLogIn : null}</span>
            <div className="block-content">
              <form onSubmit={LogInUser} className="form form-login" id="login-form">
                <fieldset className="fieldset login" data-hasrequired="* Обязательные поля">
                  <div className="field name required">
                    <label className="label" htmlFor="email">
                      <span>E-mail :{massageForLogIn ? massageForLogIn : null}</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        required
                        onChange={onHandlerInputLogIn}
                        name="login[username]"
                        value={valueInputsLogIn.email}
                        autoComplete="on"
                        id="email"
                        type="email"
                        className={'input-text ' + disabled}
                        title="email"></input>
                    </div>
                  </div>

                  <div className="field password required">
                    <label htmlFor="pass" className="label">
                      <span>Пароль :{massageForLogIn ? massageForLogIn : null}</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        required
                        value={valueInputsLogIn.password}
                        onChange={onHandlerInputLogIn}
                        name="login[password]"
                        type="password"
                        autoComplete="on"
                        className={'input-text ' + disabled}
                        id="pass"
                        title="Пароль"></input>
                    </div>
                  </div>
                  <div className="actions-toolbar">
                    <div className="primary">
                      <button className="action login primary" type="submit">
                        <span>Увiйти</span>
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

          <div
            className={
              !active
                ? 'block-customer-login right activeMobileContent'
                : 'block-customer-login  right'
            }>
            <div className="block-content">
              <form onSubmit={createUser} className="form form-login" id="regist-form">
                <fieldset className="fieldset login" data-hasrequired="* Обязательные поля">
                  <div className="field name required">
                    <label className="label" htmlFor="name">
                      <span>Iмя :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        required
                        onChange={onHandlerInputReg}
                        name="login[username]"
                        value={valueInputsReg.text}
                        autoComplete="on"
                        id="name"
                        type="text"
                        className={'input-text ' + disabled}
                        title="Name"></input>
                    </div>
                  </div>
                  <div className="field name required">
                    <label className="label" htmlFor="email-regist">
                      <span>E-mail :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        required
                        onChange={onHandlerInputReg}
                        name="login[username]"
                        value={valueInputsReg.email}
                        autoComplete="on"
                        id="email-regist"
                        type="email"
                        className={'input-text ' + disabled}
                        title="email"></input>
                    </div>
                  </div>
                  {/* <div className="field tel required">
                    <label className="label" htmlFor="tel">
                      <span>Телефон :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        onChange={onHandlerInput}
                        name="login[tel]"
                        value={valueInputs.tel}
                        autoComplete="on"
                        id="tel"
                        type="tel"
                        className={'input-text ' + disabled}
                        title="Phone"></input>
                    </div>
                  </div> */}
                  <div className="field password required">
                    <label htmlFor="password-regist" className="label">
                      <span>Пароль :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        required
                        value={valueInputsReg.password}
                        onChange={onHandlerInputReg}
                        name="login[password]"
                        type="password"
                        autoComplete="off"
                        className={'input-text ' + disabled}
                        id="password-regist"
                        title="Пароль"></input>
                    </div>
                  </div>
                  <div className="actions-toolbar">
                    <div className="primary">
                      <button className="action login primary" type="submit">
                        <span>Зареєструватися</span>
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
          <div className="social_block">
            <div className="title">Увійти через соцмережі</div>
            <div className="wrapp_btn">
              <button className="soc_btn facebook">
                <Image width={20} height={20} src={GoogleSvg} alt="logo"></Image>
              </button>
              <button className="soc_btn google">
                <Image width={20} height={20} src={FacebookSvg} alt="logo"></Image>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="block-logIn">
          <h2 className="title-product-block">ви увiйшли як </h2>
          <p>{CurrentUser && CurrentUser.name}</p>
          <button className="button-default-white" onClick={goToMainPage}>
            <span>в каталог</span> <Image width={20} height={20} src={LinkSvg} alt="logo"></Image>
          </button>
          <button className="button-default-white" onClick={goToCart}>
            <span>в корзину</span> <Image width={20} height={20} src={LinkSvg} alt="logo"></Image>
          </button>
          <button className="action login primary" onClick={LogOut}>
            <span>вийти</span>
          </button>
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
          content: ' *';
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
