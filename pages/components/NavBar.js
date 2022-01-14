import Link from 'next/link';

import Image from 'next/image';
import Logo from '../../public/img/logo.png';
import { useState, useRef, useEffect, useDebugValue } from 'react';
import { useRouter } from 'next/router';

export default function NavBar(props) {
  const router = useRouter();
  const [open, setOpen] = useState('');
  const [gamburger, setGamburger] = useState('');

  useEffect(() => {
    console.log(' useEffect scroll  redner NavBar');

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
      // document.body.style.top = '0px';
      // document.body.classList.add('bg');
      document.body.style.overflow = 'hidden';
      setOpen('none');
      setGamburger('transform-button');
    }
  };
  return (
    <>
      <header className="header-nav" tabIndex="0">
        {' '}
        <button
          onClick={(e) => {
            toggleMenu();
          }}
          className="button"
          tabIndex="0">
          <span className={'icon-bar ' + gamburger}></span>
          <span className={'icon-bar ' + gamburger}></span>
          <span className={'icon-bar ' + gamburger}></span>
        </button>
        <div className="header-title">меню</div>
        <div className="header-logo">
          {/* <img src="" alt="" /> */}
          <Image width={70} height={70} src={Logo} alt="logo"></Image>
        </div>
      </header>

      <nav className="second-header">
        <ul>
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
          <li className={router.pathname == '/pants' ? 'active' : ''}>
            <Link href="/pants">
              <a>брюки</a>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="nav-container-sidebar">
        <div className="nav-content" tabIndex="0" style={{ transform: open }}>
          <ul>
            <li className={router.pathname == '/' ? 'active' : ''} onClick={toggleMenu}>
              <Link href="/">
                <a>Главная</a>
              </Link>
            </li>
            <li className={router.pathname == '/sport-kostums' ? 'active' : ''}>
              <Link href="/sport-kostums">
                <a>костюмы</a>
              </Link>
            </li>
            <li className={router.pathname == '/pants' ? 'active' : ''}>
              <Link href="/pants">
                <a> брюки</a>
              </Link>
            </li>
            <li className={router.pathname == '/shorts' ? 'active' : ''}>
              <Link href="/shorts">
                <a>шорты</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>

            <li className="small">
              <Link href="#0">Facebook</Link>
              <Link href="#0">Instagram</Link>
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>{`
        /* .header {
  width: 100%;
  height: 20vh;
  background: #fdfdfd;
  font-family: 'Encode Sans Condensed', sans-serif;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #212121;
} */
        .header-nav {
          display: flex;
          position: fixed;
          width: 100%;
          height: 70px;
          background: white;
          z-index: 999;
          // justify-content: space-between;
          align-items: center;
        }
        .header-logo {
          margin: 0 auto;
          // border: 1px solid #000;
        }
        .header-nav ul {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .header-nav li {
          padding: 10px 5px;
          display: block;
          text-transform: uppercase;
          transition: color 0.1s;
        }
        .header-nav li a {
          padding: 10px 5px;
          display: block;

          text-transform: uppercase;
          transition: color 0.1s;
        }
        .active a {
          font-weight: bold;
        }
        .header-nav li a:hover {
          opacity: 0.7;
        }

        .second-header {
          width: 100%;
          padding-top: 70px;
        }
        .second-header ul {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .second-header li {
        }
        .second-header li a {
          padding: 5px 2px;
          display: block;

          text-transform: uppercase;
          transition: color 0.1s;
        }

        .second-header li a:hover {
          opacity: 0.7;
        }

        .nav-container-sidebar {
          position: fixed;
          z-index: 999;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }

        .nav-container-sidebar * {
          visibility: visible;
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
          margin-left: 25px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .header-title {
          margin-left: 20px;
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

        /* .nav-container-sidebar:focus-within .button {
  pointer-events: none;
} */
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
          padding: 20px;
          width: 90%;
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

        .nav-content li a {
          padding: 10px 5px;
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
      `}</style>
    </>
  );
}
