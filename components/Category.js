import React from 'react';
import Link from 'next/link';
import Accordion from '../components/Accordion';
import { useRouter } from 'next/router';
export default function Category() {
  const router = useRouter();
  return (
    <div className="category-catalog">
      <div className="accordion-block">
        <Accordion title={'спортивні костюми'} cls={'page-filter-bold'}>
          <li className={router.pathname == '/sport-kostums link' ? 'active' : 'link'}>
            <Link href="/sport-kostums" shallow>
              <a>костюми</a>
            </Link>
          </li>
          <li className={router.pathname == '/sport-kostums link' ? 'active' : 'link'}>
            <Link href="/sport-kostums" shallow>
              <a>теплі костюми</a>
            </Link>
          </li>
        </Accordion>
      </div>
      <div className="accordion-block">
        <Accordion title={'спортивні штани'} cls={'page-filter-bold'}>
          <li className={router.pathname == '/pants' ? 'active link' : 'link'}>
            <Link href="/pants" shallow>
              <a>штани</a>
            </Link>
          </li>
          <li className={router.pathname == '/pants' ? 'active link' : 'link'}>
            <Link href="/pants" shallow>
              <a>теплі штани</a>
            </Link>
          </li>
        </Accordion>
      </div>
      <div className="accordion-block">
        <Accordion title={'худі'} cls={'page-filter-bold'}>
          <li className={router.pathname == '/hoodie' ? 'active link' : 'link'}>
            <Link href="/hoodie" shallow>
              <a>худі</a>
            </Link>
          </li>
          <li className={router.pathname == '/hoodie' ? 'active link' : 'link'}>
            <Link href="/hoodie" shallow>
              <a>теплі худі</a>
            </Link>
          </li>
        </Accordion>
      </div>
      <li className={router.pathname == '/sweatshirt' ? 'active link' : 'link-single'}>
        <Link href="/sweatshirt" shallow>
          <a>світшоти</a>
        </Link>
      </li>
      <li className={router.pathname == '/shorts' ? 'active link' : 'link-single'}>
        <Link href="/shorts" shallow>
          <a>шорти</a>
        </Link>
      </li>
      <li className={router.pathname == '/t-shirt' ? 'active link' : 'link-single'}>
        <Link href="/t-shirt" shallow>
          <a>футболки</a>
        </Link>
      </li>

      <style jsx>{`
        .link {
          margin: 10px 0px 0 10px;
        }
        .link-single {
          margin: 10px 0;
          font-weight: 600;
          // padding: 10px 0;
          letter-spacing: 1.4px;
        }
      `}</style>
    </div>
  );
}
