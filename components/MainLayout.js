import NavBar from './NavBar';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mainLayout.module.css';

import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
export default function MainLayout({ children, cls }) {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useState('');
  const [gamburger, setGamburger] = useState('');
  const divBackgroundEl = useRef(null);

  const toggleMenu = () => {
    const className = divBackgroundEl.current.className;
    if (className === 'ad_bg') {
      divBackgroundEl.current.className = '';
    } else {
      divBackgroundEl.current.className = 'ad_bg';
    }
    if (openSideMenu === 'none') {
      document.body.style.overflow = 'scroll';
      setOpenSideMenu('');
      setGamburger('');
    } else {
      document.body.style.overflow = 'hidden';
      setOpenSideMenu('none');
      setGamburger('transform-button');
    }
  };

  return (
    <>
      <NavBar
        openSideMenu={openSideMenu}
        toggleMenu={toggleMenu}
        transformGamburger={gamburger}></NavBar>

      <main className={styles.main}>
        <div className={cls ? styles['container-index'] : styles.container}>
          <section className={styles['product-container']}>{children}</section>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </div>
      </footer>
      <div onClick={toggleMenu} ref={divBackgroundEl}></div>
    </>
  );
}
