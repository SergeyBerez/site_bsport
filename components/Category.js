import React from "react";
import Link from "next/link";
import Accordion from "../components/Accordion";
import { useRouter } from "next/router";
export default function Category({ cls }) {
  const router = useRouter();
  const navParams = [
    {
      href: "/sport-kostums",
      href2: "/sport-kostums-warm",
      name: "спортивні костюми",
      name2: "теплі спортивні костюми",
      className: router.pathname == "/sport-kostums" ? "active" : "",
    },
    {
      href: "/pants",
      href2: "/pants-warm",
      name: "спортивні штани",
      name2: "теплі штани",
      className: router.pathname == "/pants" ? "active" : "",
    },
    {
      href: "/hoodie",
      href2: "/hoodie-warm",
      name: "худі",
      name2: "теплі худі",
      className: router.pathname == "/hoodie" ? "active" : "",
    },
  ];
  return (
    <div className={"category-catalog " + cls}>
      {navParams.map((item) => {
        return (
          <div key={item.name} className="accordion-block">
            <Accordion title={item.name} cls={cls}>
              <li className={item.className}>
                <Link href={item.href} shallow>
                  <a>{item.name}</a>
                </Link>
              </li>
              <li className={item.className}>
                <Link href={item.href2} shallow>
                  <a>{item.name2}</a>
                </Link>
              </li>
            </Accordion>
          </div>
        );
      })}

      <li className={router.pathname == "/sweatshirt" ? "active" : ""}>
        {/* <Link href="/sweatshirt" shallow>
          <a>світшоти</a>
        </Link> */}
      </li>
      <li className={router.pathname == "/shorts" ? "active" : ""}>
        <Link href="/shorts" shallow>
          <a>шорти</a>
        </Link>
      </li>
      {/* <li className={router.pathname == '/t-shirt' ? 'active' : ''}>
        <Link href="/t-shirt" shallow>
          <a>футболки</a>
        </Link>
      </li> */}

      <style jsx>{`
        li {
          margin: 10px;
        }
        .active {
          font-weight: 600;
        }
        .link {
          margin: 10px 0px 0 10px;
        }
        .link-single {
          margin: 0px;
          padding: 10px 0;
          font-weight: 600;

          letter-spacing: 1.4px;
        }
      `}</style>
    </div>
  );
}
