import React from "react";
import MainLayout from "../components/MainLayout";
import Image from "next/image";
import Ukrpochta from "../public/static/img-cotial/Ukrposhta-ua.svg";
import Novapochta from "../public/static/img-cotial/Nova_Poshta_2014_logo.svg";
import Meest from "../public/static/img-cotial/Meest_Corporation_logo.svg";
export default function delivery() {
  return (
    <MainLayout>
      <h2>доставка</h2>

      <div className="block-cotial-media">
        {" "}
        <div className="cotial-media">
          <div className="title">У відділення Укр Пошта</div>
          <Image src={Ukrpochta} width={100} height={40}></Image>
        </div>
        <div className="cotial-media">
          <div className="title">Кур'єром Міст Експрес</div>
          <Image src={Meest} width={100} height={30}></Image>
        </div>
        <div className="cotial-media">
          <div className="title">У відділення Нова Пошта</div>
          <Image src={Novapochta} width={100} height={30}></Image>
        </div>
      </div>

      <style jsx>{`
        .block-cotial-media {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          background: #fff;
          margin: 20px 0;
        }
        .cotial-media {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin: 20px;
          align-items: center;
          border-right: none;
        }
        .cotial-media:last-child {
          border-right: none;
        }
        .title {
          font-size: 1.4rem;
          font-weight: 700;
          display: block;
          line-height: 1.375rem;
          margin: 24px 0;
          color: #000;
          text-transform: uppercase;
        }

        @media (min-width: 510px) {
          .cotial-media {
            flex-basis: calc(100% / 3 - 40px);
            border-right: 1px solid #ededed;
          }
        }
      `}</style>
    </MainLayout>
  );
}
