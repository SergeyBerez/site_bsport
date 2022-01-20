import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect, useDebugValue } from 'react';

import user from '../public/img/user2.svg';
import cart from '../public/img/cart.svg';
import Logo from '../public/img/logo.png';
import arrowNext from '../public/img/arrow-next.svg';

export default function NavBar(props) {
  const router = useRouter();
  const [open, setOpen] = useState('');
  const [gamburger, setGamburger] = useState('');
  let arr = router.pathname.split('/');

  useEffect(() => {
    // document.body.classList.remove('bg');
  }, []);

  const toggleMenu = () => {
    // function hide(e) {
    //   console.log(e.target);
    // }
    if (open === 'none') {
      // document.body.removeEventListener('click', hide);
      document.body.style.overflow = 'scroll';

      // document.body.classList.remove('bg');
      setOpen('');
      setGamburger('');
    } else {
      // document.body.addEventListener('click', hide);

      // document.body.classList.add('bg');
      document.body.style.overflow = 'hidden';
      setOpen('none');
      setGamburger('transform-button');
    }
  };
  return (
    <>
      <header className="header" tabIndex="0">
        <button onClick={toggleMenu} className="button" tabIndex="0">
          <span className={'icon-bar ' + gamburger}></span>
          <span className={'icon-bar ' + gamburger}></span>
          <span className={'icon-bar ' + gamburger}></span>
          <span className="header-title">меню</span>
        </button>
        <div className="header-logo">
          {' '}
          <Image width={70} height={70} src={Logo} alt="logo"></Image>
        </div>{' '}
        <nav className="nav-header">
          <ul>
            {/* <li className={router.pathname == '/' ? 'li active' : 'li'}>
              <Link href="/">
                <a>катaлог</a>
              </Link>
            </li> */}
            <li className={router.pathname == '/pants' ? 'active' : ''}>
              <Link href="/pants">
                <a>брюки</a>
              </Link>
            </li>
            <li className={router.pathname == '/shorts' ? 'active' : ''}>
              <Link href="/shorts">
                <a>шорты</a>
              </Link>
            </li>
            <li className={router.pathname == '/sport-kostums' ? 'active' : ''}>
              <Link href="/sport-kostums">
                <a>костюмы</a>
              </Link>
            </li>

            <li className={router.pathname == '/delivery' ? 'li active' : 'li'}>
              <Link href="/delivery">
                <a>доставка</a>
              </Link>
            </li>
            <li className={router.pathname == '/about' ? 'li active' : 'li'}>
              <Link href="/about">
                <a>контакти</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="block-user-cart">
          <div className="user-header">
            {' '}
            <Image width={30} height={30} src={user} alt="logo"></Image>
          </div>
          <div className="cart-header">
            {' '}
            <Image width={30} height={30} src={cart} alt="logo"></Image>
          </div>
        </div>
      </header>

      <div className="nav-container-sidebar">
        <div className="nav-content" tabIndex="0" style={{ transform: open }}>
          <ul>
            <li className={router.pathname == '/' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/">
                <a>Главная</a>
              </Link>
            </li>
            <li
              className={router.pathname == '/sport-kostums' ? 'active' : ''}
              onClick={toggleMenu}>
              <Link href="/sport-kostums">
                <a>костюмы</a>
              </Link>
            </li>
            <li className={router.pathname == '/pants' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/pants">
                <a> брюки</a>
              </Link>
            </li>
            <li className={router.pathname == '/shorts' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/shorts">
                <a>шорты</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li> */}
            <li className={router.pathname == '/delivery' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/delivery">
                <a>доставка</a>
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link href="/about">
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
        <ul className="items">
          <li className={router.pathname == '/' ? 'item category active' : 'item category'}>
            <Link href="/">
              <a title="Go to Home Page">катaлог</a>
            </Link>
          </li>
          {router.pathname !== '/' ? (
            <Image width={10} height={10} src={arrowNext} alt="logo"></Image>
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
                : ''
            }>
            <Link href={`/${arr[1]}`}>
              <a title={`/${arr[1]}`}>
                {' '}
                {router.pathname == '/shorts' ? 'шорты' : null}
                {router.pathname == '/pants' ? 'штаны' : null}
                {router.pathname == '/sport-kostums' ? 'костюмы' : null}
                {router.pathname == '/delivery' ? 'доставка' : null}
                {router.pathname == '/about' ? 'контакти' : null}
                {router.query.id && arr[1] == 'shorts' ? 'шорты' : null}
                {router.query.id && arr[1] == 'pants' ? 'штаны' : null}
                {router.query.id && arr[1] == 'sport-kostums' ? 'костюмы' : null}
                {/* {router.query.id ==arr[1]? : null} */}
              </a>
            </Link>
          </li>{' '}
          {router.query.id ? (
            <Image width={10} height={10} src={arrowNext} alt="logo"></Image>
          ) : null}{' '}
          <li className={router.query.id ? 'active' : null}>
            {router.query.id ? `model${router.query.id}` : null}{' '}
          </li>{' '}
        </ul>
      </div>
      <div className="ad_bg"></div>
      <style jsx>{`
        /* .header {
  width: 100%;
  height: 20vh;
  background: #fdfdfd;
  
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #212121;
} */
        .header {
          font-weight: 600;
          font-size: 0.875rem;
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
          font-weight: 800;
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
        }
        .nav-container-sidebar {
          position: fixed;
          z-index: 999;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }

        .nav-container-sidebar * {
          // visibility: visible;
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
          margin-top: 2px;
          font-size: 10px;
          color: #323232;

          font-size: 10px;
          line-height: 15px;
          text-transform: uppercase;
          font-weight: 400;
          text-align: center;
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
        .nav-content ul li {
          border-bottom: 1px solid #b4abab;
        }
        .nav-content li a {
          padding: 10px 10px;
          display: block;
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
          font-weight: 700;
        }
        .active a {
          font-weight: bold;
          // border-bottom: 4px solid #323232;
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
