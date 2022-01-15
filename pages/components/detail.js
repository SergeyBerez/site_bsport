import React from 'react';

export default function detail({ v, onClick }) {
  console.log(v);
  return (
    <>
      <button onClick={onClick} className="button25">
        {v}
      </button>
      <style jsx>{`
        button.button25 {
          position: relative;
          font-size: 17px;
          height: 2.5em;
          line-height: 2.5em;
          vertical-align: middle;
          text-align: center;
          text-decoration: none;
          text-shadow: 0 -1px 1px #777;
          color: #fff;
          outline: none;
          border: 2px solid #f64c2b;
          border-radius: 5px;
          box-shadow: 0 0 0 60px rgba(0, 0, 0, 0) inset, 0.1em 0.1em 0.2em #800;
          background: linear-gradient(#fb9575, #f45a38 48%, #ea1502 52%, #f02f17);
        }
        button.button25:active {
          top: 0.1em;
          left: 0.1em;
          box-shadow: 0 0 0 60px rgba(0, 0, 0, 0.05) inset;
        }
      `}</style>
    </>
  );
}
