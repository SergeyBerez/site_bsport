import React from "react";
import Image from "next/image";
import Link from "next/link";
import Instagram from "../public/static/img-cotial/1298747_instagram_brand_logo_social media_icon.svg";
import Telegram from "../public/static/img-cotial/3787425_telegram_logo_messanger_social_social media_icon.svg";
import Viber from "../public/static/img-cotial/6214500_handset_logo_telephone_viber_icon.svg";
import Ukrpochta from "../public/static/img-cotial/Ukrposhta-ua.svg";
import Novapochta from "../public/static/img-cotial/Nova_Poshta_2014_logo.svg";
import Meest from "../public/static/img-cotial/Meest_Corporation_logo.svg";
import Monobank from "../public/static/img-cotial/monobank-51.svg";
import Privatbank from "../public/static/img-cotial/privatbank-29.svg";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <span className="footer-title">ДОПОМОГА ТА ІНФОРМАЦІЯ</span>
        <ul>
          <li>
            <Link href="/rules">
              <a> Правила магазину</a>
            </Link>
          </li>
          <li>Співпраця</li>
          <li>
            <Link href="/povernenya">
              <a> Повернення і рекламація</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a> Контакт</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-col">
        {" "}
        <span className="footer-title">Доставка</span>
        <ul>
          <li>У відділення Нова Пошта</li>
          <Image src={Novapochta} width={80} height={30}></Image>
          <li>У відділення Укр Пошта</li>
          <Image src={Ukrpochta} width={100} height={40}></Image>
          <li>Кур'єром Міст Експрес</li>
          <Image src={Meest} width={70} height={20}></Image>
        </ul>
      </div>
      <div className="footer-col">
        {" "}
        <span className="footer-title">Оплата</span>
        <ul>
          <li>Банківською карткою</li>
        </ul>{" "}
        <div>
          <Image src={Monobank} width={200} height={100}></Image>
        </div>
        <div>
          <Image src={Privatbank} width={200} height={100}></Image>
        </div>
      </div>
      <div className="footer-col">
        {" "}
        <span className="footer-title">Стежте за нами:</span>
        <div className="block-cotial-media">
          {" "}
          <div className="cotial-media">
            {" "}
            <Link href="https://instagram.com/bsportswear.ua?igshid=YmMyMTA2M2Y=">
              <a>
                {" "}
                <Image src={Instagram} width={30} height={30}></Image>{" "}
              </a>
            </Link>
          </div>
          <div className="cotial-media">
            <Link href="https://t.me/bsportwear">
              <a>
                {" "}
                <Image src={Telegram} width={30} height={30}></Image>
              </a>
            </Link>
          </div>
          <div className="cotial-media">
            <Link href="https://invite.viber.com/?g2=AQBx8ARYrnYFoUvk5WLEBTkzCqy4J6yJL2aLk4b8g3OKoWWK8jQ2kzlKznNMtewz">
              <a>
                {" "}
                <Image src={Viber} width={30} height={30}></Image>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-col">
        {" "}
        <ul className="">
          <li className="elementor">
            <span className="list-content">Україна, м. Хмельницький </span>
          </li>
          <li className="elementor">
            <span className="list-content">+380 (63) 248 32 00 </span>
            <a
              href="tel:%20(050)%20030-1030"
              className="wd-fill"
              aria-label="List item link"
            ></a>
          </li>
          <li className="elementor-repeater-item-a511145">
            <span className="list-icon"></span>
            <span className="list-content">
              Робочий час: Пн - Сб 09:00 - 19:00
            </span>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          flex-wrap: wrap;

          flex: 0 1 auto;
          border-top: 1px solid #eaeaea;
          background: #fff;
          margin: 20px 0;
        }
        .footer-col {
          //flex-basis: calc(100% / 3 - 40px);
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 20px;
          border-bottom: 1px solid #ededed;
          border-right: none;
        }
        .footer-col:last-child {
          border-right: none;
          flex-grow: 1;
          text-align: center;
        }
        .list-content {
          color: #777777;
        }
        .footer-col ul > li {
          padding: 10px 0;
          margin-left: 0;
        }
        .footer-title {
          font-size: 1.4rem;
          font-weight: 700;
          display: block;
          line-height: 1.375rem;
          margin: 24px 0;
          color: #000;
          text-transform: uppercase;
        }
        .block-cotial-media {
          width: 100%;
          display: flex;
          justify-content: start;
        }
        .cotial-media {
          margin: 10px;
        }
        @media (min-width: 480px) {
          .footer-col {
            flex-basis: calc(100% / 2 - 40px);
          }
        }
        @media (min-width: 680px) {
          .footer-col {
            flex-basis: calc(100% / 3 - 40px);
          }
        }
        @media (min-width: 860px) {
          .footer-col {
            flex-basis: calc(100% / 4 - 40px);
            border-right: 1px solid #ededed;
          }
          .footer-col:last-child {
            border-right: none;
            border-bottom: none;
            flex-grow: 1;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
