import React from "react";
import MainLayout from "../components/MainLayout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Catalog() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const DataSvgForSlider = [
    {
      path: "shorts",
      name: "шорти",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2022-01-25_14-13-53_3_.webp?alt=media&token=dbba9899-8386-420e-8f06-7cd9b5e534d8",
    },
    {
      path: "pants",
      name: "штани",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-04-08_19-57-15.webp?alt=media&token=2548d1a0-1660-48b4-beb5-3256e65afcab",
    },
    {
      path: "sport-kostums",
      name: "костюми",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-04-15_22-15-52.webp?alt=media&token=acc72733-fb20-407c-9d14-7b32dda573b2",
    },
    {
      path: "sport-kostums-warm",
      name: "теплі костюми",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-04-15_22-15-52.webp?alt=media&token=acc72733-fb20-407c-9d14-7b32dda573b2",
    },
    {
      path: "sports-jacket",
      name: "кофти",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2022-03-28_10-33-46.jpg?alt=media&token=1d10b2a5-15fa-455c-b200-45cd474725ae",
    },
    {
      path: "hoodie",
      name: "худi",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2022-03-28_10-21-40.jpg?alt=media&token=43650e4b-bd78-4493-90df-cc8d887f3915",
    },
    {
      path: "t-shirt",
      name: "футболки",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-07-12_20-32-00.webp?alt=media&token=e14ee5e9-d4cc-4a64-97b9-42c0bf779779",
    },
  ];
  const renserSkelton = DataSvgForSlider.map((obj, i) => {
    return (
      <div className="productCard_block-katalog" key={i}>
        <div>
          <Image
            alt={"pant"}
            width={300}
            height={400}
            src={
              "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505"
            }
          ></Image>
          <div className="bottom-subtitle">
            <button className="button button-default-white">...</button>
          </div>
        </div>
      </div>
    );
  });
  const renderGoods = DataSvgForSlider.map((obj, i) => {
    return (
      <div className="productCard_block-katalog" key={i}>
        <Link href={`/${obj.path}`} passHref>
          <div>
            {/* <Image alt={obj?.name} width={300} height={400} src={obj?.urlImg}></Image> */}

            {obj?.urlImg.length > 0 && (
              <Image
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRm knyJckliyjqTzSlT54b6bk+h0R//2Q=="
                src={obj?.urlImg}
                alt={obj?.name}
                width={300}
                height={400}
              />
            )}
            <div className="bottom-subtitle">
              <button className="button button-default-white">
                {obj?.name}
              </button>
            </div>
          </div>
        </Link>{" "}
      </div>
    );
  });

  return (
    <>
      <Head>
        {" "}
        <title>одяг</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <h1 className="title-product-block h1">Каталог</h1>
        {loading ? renserSkelton : renderGoods}
      </MainLayout>
    </>
  );
}
