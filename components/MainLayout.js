import Header from "./Header";

import styles from "./mainLayout.module.css";

import { useRef, useState } from "react";
import Footer from "./Footer";
export default function MainLayout({ children, cls }) {
  const [openSideMenu, setOpenSideMenu] = useState("");
  const [gamburger, setGamburger] = useState("");
  const divBackgroundEl = useRef(null);

  const toggleMenu = () => {
    const className = divBackgroundEl.current.className;
    if (className === "ad_bg") {
      divBackgroundEl.current.className = "";
    } else {
      divBackgroundEl.current.className = "ad_bg";
    }
    if (openSideMenu === "none") {
      document.body.style.overflow = "scroll";
      setOpenSideMenu("");
      setGamburger("");
    } else {
      document.body.style.overflow = "hidden";
      setOpenSideMenu("none");
      setGamburger("transform-button");
    }
  };

  return (
    <>
      <Header
        openSideMenu={openSideMenu}
        toggleMenu={toggleMenu}
        transformGamburger={gamburger}
      ></Header>

      <main className={styles.main}>
        <div className={cls ? styles["container-index"] : styles.container}>
          <section className={styles["product-container"]}>{children}</section>
        </div>
      </main>

      <Footer></Footer>
      <div onClick={toggleMenu} ref={divBackgroundEl}></div>
    </>
  );
}
