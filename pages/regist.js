import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore/lite';

import { useAppContext, db, auth } from '../context/firebaseContext';
export default function Registration() {
  const { LogOut, setCurrentUser, uidUser } = useAppContext();
  const [disabled, setDisbled] = useState('');

  const [massage, setMassage] = useState('');
  const [valueInputs, setValueInput] = useState({
    email: '',
    password: '',
    text: '',
  });
  const [valueInputsLogIn, setValueInputLogIn] = useState({
    email: '',
    password: '',
  });
  const [massageForLogIn, setMassageForLogIn] = useState('');
  const Validate = (email, password) => {
    if (email == '' || password.length <= 4) {
      setDisbled('disabled');
      return true;
    } else {
      setDisbled('');
      return false;
    }
  };

  const onHandlerInput = (e) => {
    const value = e.target.value;
    const name = e.target.type;
    setValueInput({ ...valueInputs, [name]: value });
    // Validate(valueInputs.email, valueInputs.password);
  };
  const onHandlerInputLogIn = (e) => {
    const value = e.target.value;
    const name = e.target.type;
    setValueInputLogIn({ ...valueInputsLogIn, [name]: value });
    // Validate(valueInputsLogIn.email, valueInputsLogIn.password);
  };
  console.log(valueInputs);
  console.log(valueInputsLogIn);
  function createUser(e) {
    console.log('sssss');
    e.preventDefault();

    // if (Validate()) {
    //   return;
    // }
    createUserWithEmailAndPassword(auth, valueInputs.email, valueInputs.password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        setMassage('ви уcпiшно зареэструвались');
        setDisbled(true);
        setValueInput({ ...valueInputs, password: '', email: '', text: '' });
        return user.uid;
      })
      .then((id) => {
        addDoc(collection(db, 'users'), {
          name: valueInputs.text,
          email: valueInputs.email,
          id: id,
        });
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
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setCurrentUser(
        users.find((user) => {
          return user.id === id;
        }),
      );
      setMassageForLogIn('ви уcпiшно ввiйшли');
      setDisbled(true);
      setValueInputLogIn({ ...valueInputsLogIn, password: '', email: '' });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
    }

    // signInWithEmailAndPassword(auth, valueInputsLogIn.email, valueInputsLogIn.password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     setMassageForLogIn('ви уcпiшно ввiйшли');
    //     setDisbled(true);
    //     setValueInputLogIn({ ...valueInputsLogIn, password: '', email: '' });
    //     return user.uid;
    //   })
    //   .then((id) => {
    //     const querySnapshot = getDocs(collection(db, 'users'));

    //     return { a: querySnapshot, b: id };

    //     const docRef = doc(db, 'cities', id);
    //     const docSnap = getDoc(docRef);
    //     return docSnap;
    //   })
    //   .then(({ a, b }) => {
    //     console.log(a, b);
    //     const users = [];
    //     a.forEach((doc) => {
    //       users.push(doc.data().id);
    //     });
    //   })
  };
  return (
    <MainLayout>
      {!uidUser ? (
        <>
          <div className="social_block">
            <div className="title">Увійти через соцмережі</div>
            <div className="wrapp_btn">
              <button className="soc_btn facebook"></button>
              <button className="soc_btn google"></button>
            </div>
          </div>
          <div className="block block-customer-login left">
            <div className="block-title">
              <strong id="block-customer-login-heading">
                {massage ? massage : 'Новий клиент'}
              </strong>{' '}
            </div>
            <div className="block-content">
              <form onSubmit={createUser} className="form form-login" id="login-form">
                <fieldset className="fieldset login" data-hasrequired="* Обязательные поля">
                  <div className="field name required">
                    <label className="label" htmlFor="name">
                      <span>Iмя :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        onChange={onHandlerInput}
                        name="login[username]"
                        value={valueInputs.text}
                        autoComplete="on"
                        id="name"
                        type="text"
                        className={'input-text ' + disabled}
                        title="Name"></input>
                    </div>
                  </div>
                  <div className="field name required">
                    <label className="label" htmlFor="email">
                      <span>E-mail :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        onChange={onHandlerInput}
                        name="login[username]"
                        value={valueInputs.email}
                        autoComplete="on"
                        id="email"
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
                    <label htmlFor="password" className="label">
                      <span>Пароль :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        value={valueInputs.password}
                        onChange={onHandlerInput}
                        name="login[password]"
                        type="password"
                        autoComplete="off"
                        className={'input-text ' + disabled}
                        id="password"
                        title="Пароль"></input>
                    </div>
                  </div>
                  <div className="actions-toolbar">
                    <div className="primary">
                      <button className="action login primary" type="submit">
                        <span>зареэстроватися</span>
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>

          <div className="block block-customer-login right">
            <div className="block-title">
              <h5>
                Зареэстрований клiэнт
                <strong id="block-customer-login-heading"></strong>
              </h5>{' '}
              <span>{massageForLogIn ? massageForLogIn : null}</span>
            </div>
            <div className="block-content">
              <form onSubmit={LogInUser} className="form form-login" id="login-form">
                <fieldset className="fieldset login" data-hasrequired="* Обязательные поля">
                  <div className="field name required">
                    <label className="label" htmlFor="email">
                      <span>E-mail :</span>
                    </label>{' '}
                    <div className="control">
                      <input
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
                      <span>Пароль :</span>
                    </label>{' '}
                    <div className="control">
                      <input
                        value={valueInputsLogIn.password}
                        onChange={onHandlerInputLogIn}
                        name="login[password]"
                        type="password"
                        autoComplete="off"
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
        </>
      ) : (
        <div className="block-logOut">
          <h2 className="h2">{massageForLogIn}</h2>
          <button className="action login primary" onClick={LogOut}>
            <span>вийти</span>
          </button>
        </div>
      )}

      <style jsx>{`
        .block-logOut {
          margin-top: 150px;
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
        .block.block-customer-login {
          width: 350px;
          display: flex;
          margin: 0 10px;
          flex-direction: column;
        }

        .block-content {
          margin-top: auto;
        }

        .block-title {
          color: #323232;
          margin: 25px 0;
          font-style: normal;
          font-weight: 700;
          line-height: 1;
          font-size: 2rem;
          text-transform: uppercase;
          text-align: center;
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
        input[type='text'],
        input[type='email'],
        input[type='password'],
        input[type='tel'] {
          background: #fff;
          background-clip: padding-box;
          border: 1px solid #cbcbcb;
          border-radius: 0;
          color: #323232;
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

        .control {
          // display: flex;

          // flex-direction: column;
        }

        .actions-toolbar {
          padding-top: 3px;
        }
        // .login-container .actions-toolbar .secondary {
        //   margin-bottom: 25px;
        //   text-align: right;
        //   width: 100%;
        // }
        // .login-container .actions-toolbar .secondary a.action {
        //   margin-top: 0;
        // }
        // .login-container .actions-toolbar .primary {
        //   width: 100%;
        // }
        .primary {
          width: 100%;
        }
        .action.primary {
          border: 2px solid #000;
          width: 100%;
          color: #fff;
          background-color: #000;
          font-size: 14px;
          font-weight: 900;
          padding: 16px 32px 14px;
          line-height: 1;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }
        .action.primary:hover {
          background: #444;
          border: 2px solid #000;
          color: #fff;
        }
        .input-text.disabled {
          border: 1px solid red;
        }
      `}</style>
    </MainLayout>
  );
}
