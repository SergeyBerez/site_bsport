import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useFirebaseContext } from '../context/firebaseContext';
import { useGoodsContext } from '../context/contextGoods';
import user from '../public/static/img/user2.svg';
import cart from '../public/static/img/cart.svg';
import Logo from '../public/static/img/logo.png';
import arrowNext from '../public/static/img/arrow-next.svg';
import Accordion from './Accordion';
import Category from './Category';
export default function Header({ openSideMenu, transformGamburger, toggleMenu }) {
  const router = useRouter();
  const { CurrentUser } = useFirebaseContext();
  const { state } = useGoodsContext();
  let arr = router.pathname.split('/');
  const navParamsCategory = [
    {
      href: '/sport-kostums',
      name: 'спортивні костюми',
      name2: 'теплі костюми',
      className: router.pathname == '/sport-kostums' ? 'active' : '',
    },
    {
      href: '/pants',
      name: 'спортивні штани',
      name2: 'теплі штани',
      className: router.pathname == '/pants' ? 'active' : '',
    },
    {
      href: '/hoodie',
      name: 'худі',
      name2: 'теплі худі',
      className: router.pathname == '/hoodie' ? 'active' : '',
    },
  ];
  const navParams = [
    { href: '/', name: 'головна', className: router.pathname == '/' ? 'active' : '' },
    { href: '/catalog', name: 'катaлог', className: router.pathname == '/catalog' ? 'active' : '' },
    { href: '/about', name: 'опт', className: router.pathname == '/about' ? 'active' : '' },
    {
      href: '/delivery',
      name: 'доставка',
      className: router.pathname == '/delivery' ? 'active' : '',
    },
    { href: '/about', name: 'контакти', className: router.pathname == '/about' ? 'active' : '' },
  ];

  return (
    <>
      <header className="header" tabIndex="0">
        <button onClick={toggleMenu} className="button" tabIndex="0">
          <span className={'icon-bar ' + transformGamburger}></span>
          <span className={'icon-bar ' + transformGamburger}></span>
          <span className={'icon-bar ' + transformGamburger}></span>
          <span className="header-title">меню</span>
        </button>
        <div className="header-logo">
          {' '}
          <Link href="/" shallow>
            <a title="Go to Home Page">
              <Image width={70} height={70} src={Logo} alt="logo"></Image>
            </a>
          </Link>
        </div>{' '}
        <nav className="nav-header">
          <ul>
            {navParams.map((item) => {
              return (
                <li key={item.name} className={item.className}>
                  <Link href={item.href} shallow>
                    <a>{item.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="block-user-cart">
          <div className="user-header">
            <Link href="/regist" shallow>
              <a>
                {CurrentUser?.photoURL ? (
                  <Image
                    src={CurrentUser?.photoURL ? CurrentUser?.photoURL : user}
                    width={30}
                    height={30}
                    alt="logo"></Image>
                ) : (
                  <Image width={30} height={30} src={user} alt="logo"></Image>
                )}
              </a>
            </Link>
            <p>{CurrentUser && CurrentUser.name}</p>
            <p>{CurrentUser?.displayName}</p>
          </div>
          <div className="cart-header">
            <Link href="/cart" shallow>
              <a>
                <Image width={30} height={30} src={cart} alt="cart"></Image>
                <span>{state.cart.length}</span>
              </a>
            </Link>
          </div>
        </div>
      </header>
      {/* ------------------side mobile navigation menu ------------------------- */}
      <div className="side-nav-container">
        <div className="nav-content" tabIndex="0" style={{ transform: openSideMenu }}>
          <ul>
            <li className={router.pathname == '/' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/" shallow>
                <a>головна</a>
              </Link>
            </li>

            {navParamsCategory.map((item) => {
              return (
                <div key={item.name} className="accordion-block">
                  <Accordion title={item.name} cls={'page-filter'}>
                    <li className={item.className} onClick={toggleMenu}>
                      <Link href={item.href} shallow>
                        <a>{item.name}</a>
                      </Link>
                    </li>
                    <li className={item.className} onClick={toggleMenu}>
                      <Link href={item.href} shallow>
                        <a>{item.name2}</a>
                      </Link>
                    </li>
                  </Accordion>
                </div>
              );
            })}
            {/* <div className="accordion-block">
              <Accordion title={'спортивні костюми'}>
                <li
                  className={router.pathname == '/sport-kostums' ? 'active' : ''}
                  onClick={toggleMenu}>
                  <Link href="/sport-kostums" shallow>
                    <a>костюми</a>
                  </Link>
                </li>
                <li
                  className={router.pathname == '/sport-kostums' ? 'active' : ''}
                  onClick={toggleMenu}>
                  <Link href="/sport-kostums" shallow>
                    <a>теплі костюми</a>
                  </Link>
                </li>
              </Accordion>
            </div>
            <div className="accordion-block">
              <Accordion title={'спортивні штани'}>
                <li className={router.pathname == '/pants' ? 'active' : ''} onClick={toggleMenu}>
                  <Link href="/pants" shallow>
                    <a>штани</a>
                  </Link>
                </li>
                <li className={router.pathname == '/pants' ? 'active' : ''} onClick={toggleMenu}>
                  <Link href="/pants" shallow>
                    <a>теплі штани</a>
                  </Link>
                </li>
              </Accordion>
            </div>
            <div className="accordion-block">
              <Accordion title={'худі'}>
                <li className={router.pathname == '/hoodie' ? 'active' : ''} onClick={toggleMenu}>
                  <Link href="/hoodie" shallow>
                    <a>худі</a>
                  </Link>
                </li>
                <li
                  className={router.pathname == '/warm-hoodie' ? 'active' : ''}
                  onClick={toggleMenu}>
                  <Link href="/warm-hoodie" shallow>
                    <a>теплі худі</a>
                  </Link>
                </li>
              </Accordion>
            </div> */}

            <li className={router.pathname == '/shorts' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/shorts" shallow>
                <a>шорти</a>
              </Link>
            </li>
            <li className={router.pathname == '/t-shirt' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/t-shirt" shallow>
                <a>футболки</a>
              </Link>
            </li>

            <li className={router.pathname == '/delivery' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/delivery" shallow>
                <a>доставка</a>
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href="/about" shallow>
                <a className={router.pathname == '/about' ? 'active' : ''}>контакти</a>
              </Link>
            </li>

            <li className="small">
              <Link href="#0">Facebook</Link>
              <Link href="#0">Instagram</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="breadcrumbs">
        {router.pathname == '/' ? null : (
          <ul className="items">
            <li className={router.pathname == '/' ? 'item category active' : 'item category'}>
              <Link href="/" shallow>
                <a title="Go to Home Page">{router.pathname !== '/' ? 'катaлог' : null}</a>
              </Link>
            </li>
            {router.pathname !== '/' ? (
              <Image width={10} height={10} src={arrowNext} alt="arrow"></Image>
            ) : null}
            <li
              className={
                router.pathname == '/shorts'
                  ? 'item shorts active'
                  : router.pathname == '/pants'
                  ? 'item pants active'
                  : router.pathname == '/sport-kostums'
                  ? 'item sport-kostums active'
                  : router.pathname == '/delivery'
                  ? 'item delivery active'
                  : router.pathname == '/about'
                  ? 'item about active'
                  : router.pathname == '/regist'
                  ? 'item about active'
                  : router.pathname == '/cart'
                  ? 'item about active'
                  : router.pathname == '/hoodie'
                  ? 'item about active'
                  : ''
              }>
              <Link href={`/${arr[1]}`} shallow>
                <a title={`/${arr[1]}`}>
                  {' '}
                  {router.pathname == '/shorts' ? 'шорти' : null}
                  {router.pathname == '/pants' ? 'штани' : null}
                  {router.pathname == '/hoodie' ? 'худі' : null}
                  {router.pathname == '/sport-kostums' ? 'костюми' : null}
                  {router.pathname == '/delivery' ? 'доставка' : null}
                  {router.pathname == '/about' ? 'контакти' : null}
                  {router.pathname == '/regist' ? 'авторизацiя' : null}
                  {router.pathname == '/cart' ? 'корзина' : null}
                  {router.query.id && arr[1] == 'shorts' ? 'шорти' : null}
                  {router.query.id && arr[1] == 'hoodie' ? 'худi' : null}
                  {router.query.id && arr[1] == 'pants' ? 'штани' : null}
                  {router.query.id && arr[1] == 'sport-kostums' ? 'костюми' : null}
                  {/* {router.query.id ==arr[1]? : null} */}
                </a>
              </Link>
            </li>{' '}
            {router.query.id ? (
              <Image width={10} height={10} src={arrowNext} alt="logo"></Image>
            ) : null}{' '}
            <li className={router.query.id ? 'active' : null}>
              {router.query.id ? `детально` : null}{' '}
            </li>{' '}
          </ul>
        )}
      </div>

      <style jsx>{`
        .accordion-block {
          border-bottom: 1px solid #b4abab;
        }

        .header {
          // font-weight: 600;
          font-size: 1.6rem;
          display: flex;
          position: fixed;
          width: 100%;
          height: 70px;
          background: #fff;
          z-index: 999;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 5px 4px -4px rgba(0, 0, 0, 0.2);
        }
        .header-logo {
          cursor: pointer;
          //margin: 0 auto;
          // border: 1px solid #000;
        }
        .nav-header {
          // flex-grow: 1;
          display: none;
        }
        .nav-header ul {
          // width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .nav-header li {
          padding: 10px 5px;
          display: block;
          text-transform: uppercase;
          transition: color 0.1s;
        }
        .nav-header li:hover a {
          border-bottom: 4px solid #323232;
        }

        .nav-header li a {
          padding: 10px 5px;
          display: block;
          border-bottom: 4px solid transparent;
          transition: border linear 0.2s;
          text-transform: uppercase;
          transition: color 0.1s;
        }
        .nav-header li.active a {
          font-weight: 600;
        }
        // .nav-header li a:hover {
        //   opacity: 0.7;
        // }

        // .second-header {

        // }
        // .second-header ul {
        //   display: flex;
        //   justify-content: space-around;
        //   align-items: center;
        // }
        // .second-header li {
        // }
        // .second-header li a {
        //   padding: 5px 2px;
        //   display: block;

        //   text-transform: uppercase;
        //   transition: color 0.1s;
        // }

        // .second-header li a:hover {
        //   opacity: 0.7;
        // }
        .block-user-cart {
          display: flex;
        }
        .user-header,
        .cart-header {
          cursor: pointer;
          margin-right: 20px;
          text-align: center;
        }
        .user-header p {
          text-transform: uppercase;
          font-size: 1.2rem;
          letter-spacing: 1px;
          font-weight: bold;
          color: #323232;
        }
        .side-nav-container {
          position: fixed;
          z-index: 999;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }

        .side-nav-container * {
          // visibility: visible;
        }
        .nav-content {
          margin-top: 70px;
          padding: 20px 0;
          width: 90%;
          height: 100vh;
          max-width: 300px;
          position: fixed;
          z-index: 999;
          top: 0;
          left: 0;
          height: calc(100% - 70px);
          background: white;
          pointer-events: auto;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          transform: translateX(-100%);
          transition: transform 0.3s;
          will-change: transform;
          contain: paint;
        }

        .nav-content ul {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .nav-content ul li:first-child {
          border-bottom: 1px solid #b4abab;
        }
        .nav-content li a {
          padding: 10px 10px;
          display: block;
          font-size: 1.2rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: color 0.1s;
        }

        .nav-content li a:hover {
          opacity: 0.7;
        }
        .nav-content li:not(.small) + .small {
          margin-top: auto;
        }

        .small {
          display: flex;
          align-self: center;
        }

        .small a {
          font-size: 12px;
          font-weight: 400;
          color: #888;
        }
        .small a + a {
          margin-left: 15px;
        }

        * {
          outline: none;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .breadcrumbs {
          background-color: #f5f6f7;
          padding-top: 70px;
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 30px;
        }
        .items {
          display: flex;
          align-items: center;
          font-size: 11px;
          letter-spacing: 0.7px;
          min-height: 40px;
        }
        .items > li {
          margin-left: 5px;
          margin-right: 5px;
          text-transform: uppercase;
        }

        .active {
          font-weight: 600;
        }
        .active a {
          font-weight: bold;
          // border-bottom: 4px solid #323232;
        }
        .button {
          // position: fixed;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
          -webkit-appearance: none;
          border: 0;
          background: transparent;
          border-radius: 0;
          height: 70px;
          width: 30px;
          cursor: pointer;
          pointer-events: auto;
          margin-left: 15px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        @media (min-width: 900px) {
          .button {
            display: none;
          }
          .nav-header {
            display: flex;
          }
        }
        .header-title {
          margin-top: 12px;

          color: #323232;

          text-transform: uppercase;

          text-align: center;
          font-size: 1.2rem;
          letter-spacing: 1px;
          font-weight: bold;
        }
        .icon-bar {
          display: block;
          width: 100%;
          height: 3px;
          background: #aaa;
          transition: 0.3s;
        }
        .icon-bar + .icon-bar {
          margin-top: 5px;
        }

        .icon-bar.transform-button:nth-of-type(1) {
          transform: translate3d(0, 8px, 0) rotate(45deg);
        }
        .icon-bar.transform-button:nth-of-type(2) {
          opacity: 0;
        }
        .icon-bar.transform-button:nth-of-type(3) {
          transform: translate3d(0, -8px, 0) rotate(-45deg);
        }

        // .ad_bg {
        //   top: 0;
        //   left: 0;
        //   right: 0;
        //   bottom: 0;
        //   filter: blur(4px);
        //   display: inline;
        //   width: 100%;
        //   height: 100%;
        //   position: fixed;
        //   cursor: pointer;
        //   text-decoration: none;
        // }
      `}</style>
    </>
  );
}
