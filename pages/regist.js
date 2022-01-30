import React from 'react';
import MainLayout from '../components/MainLayout';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function regist() {
  const auth = getAuth();

  function createUser(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <MainLayout>
      <div className="block block-customer-login">
        <div
          className="block-title"
          // role="tablist"
        >
          <strong
            // className="hidden-mobile"
            id="block-customer-login-heading"
            // role="heading"
            // aria-level="2"
          >
            Зарегистрированные клиенты
          </strong>{' '}
        </div>
        <div
          className="block-content"
          // aria-labelledby="block-customer-login-heading-btn"
          // data-role="content"
          // role="tabpanel"
          // data-collapsible="true"
          // aria-hidden="true"
          style={{ display: 'static' }}>
          <form
            onSubmit={createUser}
            className="form form-login"
            id="login-form"
            // novalidate="novalidate"
          >
            <input name="form_key" type="hidden" value="fw1BR4yTTDz1DxRS"></input>{' '}
            <fieldset className="fieldset login" data-hasrequired="* Обязательные поля">
              {/* <div className="field note">
                If you have an account, sign in with your email address.
              </div> */}
              <div className="field email required">
                <label className="label" htmlFor="email">
                  <span>E-mail:</span>
                </label>{' '}
                <div className="control">
                  <input
                    name="login[username]"
                    value=""
                    autoComplete="off"
                    id="email"
                    type="email"
                    className="input-text"
                    title="Email"
                    // data-validate="{required:true, 'validate-email':true}"
                    // aria-required="true"
                  ></input>
                </div>
              </div>
              <div className="field password required">
                <label htmlFor="pass" className="label">
                  <span>Пароль:</span>
                </label>{' '}
                <div className="control">
                  <input
                    name="login[password]"
                    type="password"
                    autoComplete="off"
                    className="input-text"
                    id="pass"
                    title="Пароль"
                    // data-validate="{required:true}"
                    // aria-required="true"
                  ></input>
                </div>
              </div>
              <div className="actions-toolbar">
                <div className="primary">
                  <button
                    className="action login primary"

                    // id="send2"
                  >
                    <span>Войти</span>
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <style jsx>{`
        .block.block-customer-login {
          display: flex;

          flex-direction: column;
        }
        .block-content {
          display: flex;

          flex-direction: column;
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
          content: '*';
          color: #000;
          font-size: 1.4rem;
          margin: 0 0 0 1px;
        }
        input[type='email'],
        input[type='password'] {
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
          display: flex;

          flex-direction: column;
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
      `}</style>
    </MainLayout>
  );
}
