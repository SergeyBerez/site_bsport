import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-box">1
      </div>
      <div className="footer-box">2</div>
      <div className="footer-box">3</div>
      <style jsx>{`
        .footer {
          display: flex;
          height: 200px;
          flex: 1;
          padding: 2rem 0;
          border-top: 1px solid #eaeaea;
          justify-content: center;
          align-items: center;
          background: #fff;
        }
        .footer-box {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </footer>
  );
}
