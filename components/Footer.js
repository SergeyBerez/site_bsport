import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <span className="footer-title">ДОПОМОГА ТА ІНФОРМАЦІЯ</span>
        <ul>
          <li>Правила магазину</li>
          <li>Співпраця</li>
          <li> Повернення і рекламація</li>
          <li> Контакт</li>
        </ul>
      </div>
      <div className="footer-col">
        {' '}
        <span className="footer-title">Доставка</span>
        <ul>
          <li>У відділення Нова Пошта</li>
          <li>укр пошта</li>
        </ul>
      </div>
      <div className="footer-col">
        {' '}
        <span className="footer-title">Оплата</span>
        <ul>
          <li>У відділення Нова Пошта</li>
          <li>укр пошта</li>
        </ul>
      </div>
      <div className="footer-col">
        {' '}
        <span className="footer-title">Стежте за нами:</span>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          height: 200px;
          flex: 0 1 auto;
          padding: 2rem 0;
          border-top: 1px solid #eaeaea;
         
          background: #fff;
        }
        .footer-col {
          display: flex;
          flex-direction: column;
          flex: 1 1;
          width: auto;
          padding: 0 32px 32px
          border-right: 1px solid #ededed;
        }
        .footer-col ul>li{
         padding: 10px 0;
         margin-left: 0;
        }
        .footer-title {
          font-size: 1rem;
          font-weight: 700;
          display: block;
          line-height: 1.375rem;
          margin: 24px 0;
          color: #000;
          text-transform: uppercase;
        }
      `}</style>
    </footer>
  );
}
