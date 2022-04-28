import Header from './Header';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mainLayout.module.css';

import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import Footer from './Footer';
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
      <Header
        openSideMenu={openSideMenu}
        toggleMenu={toggleMenu}
        transformGamburger={gamburger}></Header>

      <main className={styles.main}>
        <div className={cls ? styles['container-index'] : styles.container}>
          <section className={styles['product-container']}>{children}</section>
        </div>
      </main>

      <Footer></Footer>
      <div onClick={toggleMenu} ref={divBackgroundEl}></div>
    </>
  );
}
