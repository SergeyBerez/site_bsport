import NavBar from './NavBar';
import Link from 'next/link';
import Image from 'next/image';
import styles from './mainLayout.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function MainLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    console.log(' useEffect redner MainLayout', router.pathname);
  }, []);
  return (
    <>
      <NavBar></NavBar>

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
    </>
  );
}
