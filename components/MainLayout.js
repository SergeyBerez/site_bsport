import NavBar from './NavBar';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mainLayout.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
export default function MainLayout({ children }) {
  const router = useRouter();
  const [openSideMenu, setOpenSideMenu] = useState('');
  const [gamburger, setGamburger] = useState('');
  const divBackgroundEl = useRef(null);

  const toggleMen = () => {
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

  useEffect(() => {
    console.log(' useEffect redner MainLayout', router.pathname);
  }, []);

  const showBackground = () => {
    console.log('sss');
  };
  return (
    <>
      <NavBar
        openSideMenu={openSideMenu}
        toggleMenu={toggleMen}
        transformGamburger={gamburger}></NavBar>

      <main className={styles.main}>
        <div className="container">
          <div className={styles['product-container']}>{children}</div>
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
      <div onClick={toggleMen} ref={divBackgroundEl}></div>
    </>
  );
}
