import React, { useState } from 'react';
import arrowNext from '../public/img/arrow-next.svg';
import Image from 'next/image';
export default function Accordion(props) {
  const { title } = props;
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="accordion">
        <div className="accordion-title" onClick={toggle}>
          <span>{title}</span>
          <div className="toggle" aria-expanded={isOpen}>
            <Image src={arrowNext} alt="uppy"></Image>
          </div>
        </div>
        <div className="accordion-content" aria-expanded={!isOpen}>
          {props.children}
        </div>
      </div>

      <style jsx>{`
        .accordion {
          margin: 0;
          border: 1px solid #d8d5db;
          border-width: 0px 1px 1px 1px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .accordion:nth-of-type(1) {
          border-top-width: 1px;
        }

        .accordion-title {
          font-size: 18px;
          color: #3e4e50;
          font-weight: 500;
          display: flex;
        }

        .accordion-title:hover {
          cursor: pointer;
        }

        .accordion div.toggle {
          width: 16px;
          height: 16px;
          align-self: center;
          margin-left: auto;
          transition: all 0.35s ease;
        }

        .accordion div.toggle[aria-expanded='true'] {
          transform: rotateZ(90deg);
        }

        .accordion-content {
          overflow: hidden;
          max-height: 1000px;
          transition: max-height 1s ease-in-out;
        }

        .accordion-content[aria-expanded='true'] {
          max-height: 0px;
          transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
        }
      `}</style>
    </>
  );
}
