import React from "react";
import MainLayout from "../components/MainLayout";
import Link from "next/link";
import Image from "next/image";
import phone from "../public/static/img-cotial/2849835_phone_telephone_cell_call_communication_icon.svg";
import Viber from "../public/static/img-cotial/6214500_handset_logo_telephone_viber_icon.svg";
export default function about() {
  return (
    <MainLayout>
      <div className="Contact__contactContainerRight">
        <h4 className="ContactInfo__contactHeader">Зв'яжіться з нами або</h4>
        <div className="cotial-media">
          <Image src={Viber} width={30} height={30}></Image>
          <Link href="https://invite.viber.com/?g2=AQBx8ARYrnYFoUvk5WLEBTkzCqy4J6yJL2aLk4b8g3OKoWWK8jQ2kzlKznNMtewz">
            <a>Переходьте у нашу оптову групу Viber</a>
          </Link>
        </div>
        <div className="ContactInfo">
          <div className="block-phone">
            <Image src={phone} width={30} height={30}></Image>&nbsp;
            <Link href="tel:+380632483200">
              <a>+38(063)248 32 00</a>
            </Link>
          </div>
          <div className="block-phone">
            <Image src={phone} width={30} height={30}></Image>&nbsp;
            <Link href="tel:+380976601393">
              <a>+38(063)248 32 00</a>
            </Link>
          </div>
          <p>
            Центр обслуговування клієнтів працює з 08:00 до 20:00 7 днів на
            тиждень{" "}
          </p>
        </div>
      </div>
      <style jsx>{`
        .block-phone {
          display: flex;
          align-item: center;
        }
        .block-phone > a {
          margin-left: 10px;
          align-self: center;
        }
        .cotial-media {
          display: flex;
        }
        .cotial-media > a {
          margin-left: 20px;
          align-self: center;
        }
        .ContactInfo__contactHeader {
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 24px;
        }
        .ContactInfo {
          line-height: 20px;
        }
        .ContactInfo strong {
          font-weight: 600;
        }
      `}</style>
    </MainLayout>
  );
}
