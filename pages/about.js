import React from "react";
import MainLayout from "../components/MainLayout";
import Link from "next/link";
import Image from "next/image";
import phone from "../public/static/img-cotial/2849835_phone_telephone_cell_call_communication_icon.svg";

export default function about() {
  return (
    <MainLayout>
      <div className="Contact__contactContainerRight">
        <h4 className="ContactInfo__contactHeader">Зв'яжіться з нами</h4>

        <div className="ContactInfo">
          <div className="block-phone">
            <Image src={phone} width={30} height={30}></Image>&nbsp;
            <Link href="tel:+380632483200">
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
