import Link from 'next/link';
import { useState, useRef, useEffect, useDebugValue } from 'react';

export default function NavBar(props) {
  const [open, setOpen] = useState('');
  const [gamburger, setGamburger] = useState('');

  useEffect(() => {
    console.log(' useEffect');
    document.body.style.overflow = 'scroll';
    document.body.classList.remove('bg');
  }, []);

  const openMenu = () => {
    if (open === 'none') {
      document.body.style.overflow = 'scroll';
      document.body.classList.remove('bg');
      setOpen('');
      setGamburger('');
    } else {
      document.body.classList.add('bg');
      document.body.style.overflow = 'hidden';
      setOpen('none');
      setGamburger('transform-button');
    }
  };
  return (
    <>
      <header className="header-nav" tabIndex="0">
        <ul>
          <li>
            <Link href="/kostums">костюмы</Link>
          </li>
          <li>
            <Link href="/pants">брюки</Link>
          </li>
        </ul>
      </header>
      <button
        onClick={(e) => {
          openMenu();
        }}
        className="button"
        tabIndex="0">
        <span className={'icon-bar ' + gamburger}></span>
        <span className={'icon-bar ' + gamburger}></span>
        <span className={'icon-bar ' + gamburger}></span>
      </button>

      <nav className="nav-container">
        <div className="nav-content" tabIndex="0" style={{ transform: open }}>
          <ul>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href="/kostums">костюмы</Link>
            </li>
            <li>
              <Link href="/pants">брюки</Link>
            </li>
            <li>
              <Link href="/sliderPage">slider</Link>
            </li>
            <li>
              <Link href="#0">Contact</Link>
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

          color: #fff;
          justify-content: center;
          align-items: center;
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
          color: white;
          text-transform: uppercase;
          transition: color 0.1s;
        }

        .header-nav li a:hover {
          color: #bf7497;
        }
        .nav-container {
          position: fixed;
          height: 100vh;
          width: 100%;
          pointer-events: none;
        }

        .nav-container * {
          visibility: visible;
        }

        .button {
          position: fixed;
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

        /* .nav-container:focus-within .button {
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
          top: 0;
          left: 0;
          height: calc(100% - 70px);
          background: #ececec;
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
          color: #bf7497;
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
