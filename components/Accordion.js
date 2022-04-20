import React, { useState } from 'react';
import arrowNext from '../public/static/img/chevron_right_icon.svg';
import Image from 'next/image';
import filter from '../public/static/img/filter_filters_icon.svg';
export default function Accordion(props) {
  const { title, cls } = props;
  const [isOpen, setIsOpen] = useState(false);
  function toggle() {
    setIsOpen(!isOpen);
  }
  console.log(cls);
  return (
    <>
      <div className={'accordion'}>
        <div className={`accordion-title ${cls}`} onClick={toggle}>
          {title === 'фiльтр' ? (
            <>
              <Image src={filter} width={20} height={20} alt="cart"></Image>
              &nbsp; <span>{title}</span>
            </>
          ) : (
            <span>{title}</span>
          )}

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
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 10px 0;

          width: 100%;
        }

        .accordion:nth-of-type(1) {
          border-top-width: 1px;
        }

        .accordion-title {
          display: flex;
          align-items: center;
          white-space: nowrap;
          letter-spacing: 1.4px;
        }
        // .accordion.link {
        //   padding: 10px;
        // }
        // .accordion-title.link {
        //   font-size: 1.2rem;
        //   letter-spacing: 1px;
        //   text-transform: uppercase;

        //   transition: color 0.1s;
        // }
        .accordion-title:hover {
          cursor: pointer;
        }
        // .accordion-title.page-filter-bold {
        //   font-weight: 600;
        // }
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
