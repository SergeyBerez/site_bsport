import Head from "next/head";

import MainLayout from "../components/MainLayout";

import Link from "next/link";
import Image from "next/image";
import arrowLink from "../public/static/img/arrow-link.svg";
export default function Index() {
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
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2023-02-20_17-38-24%20(5).jpg?alt=media&token=b19b714a-3c0c-4eb2-a69b-653ad8487b75",
    },
    {
      path: "sport-kostums",
      name: "костюми",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-04-15_22-15-52.webp?alt=media&token=acc72733-fb20-407c-9d14-7b32dda573b2",
    },
    {
      path: "warm-kostum",
      name: "теплі костюми",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/winter%2Fsport-kostums%2F041warm-kostum%2Fphoto_2022-10-11_11-34-05.jpg?alt=media&token=5be721d1-98d6-4c62-8a1c-64e9ca996d4b",
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
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2023-04-16_11-15-46.jpg?alt=media&token=916f19f1-0fdf-4f80-8f0b-a21c61c1e9c8",
    },
    {
      path: "t-shirt",
      name: "футболки",
      urlImg:
        "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-07-12_20-32-00.webp?alt=media&token=e14ee5e9-d4cc-4a64-97b9-42c0bf779779",
    },
  ];

  const renderGoods = DataSvgForSlider.map((obj, i) => {
    return (
      <div className="productCard_block-katalog" key={i}>
        <p className="title-product-block"> {obj?.name}</p>
        <Link href={`/${obj.path}`} passHref>
          <a>
            <span className="category_item-image">
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
            </span>
            <div className="bottom-subtitle">
              <button className="button button-default-white">
                перейти <Image src={arrowLink} />
              </button>
            </div>
          </a>
        </Link>{" "}
      </div>
    );
  });

  return (
    <>
      <Head>
        {" "}
        <title>Чоловічі спортивний одяг оптом</title>
        <meta
          name="description"
          content="Чоловічі спортивні костюми оптом від виробника купити 063 248 32 00 ➔ . У нас: ✓ великий вибір чоловічих спортивних штанів оптом, ✔ високий рівень сервісу ₴ самі низькі ціни і ✈ доставка по всій Україні: Хмельницький, Одеса, Київ."
        />
        <meta
          name="keywords"
          content="спортивные штаны,спортивные штаны оптом,спортивні штани, спортивні штани чоловічі, спортивні штани оптом, чоловічі штани,спортивні штани, фітнес одяг, спортивні штани україна, спортивні штани оптом ,базар, штани ціна, штани магазин, штани ціна,"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <h1 className="title-product-block h1">Каталог</h1>
        {renderGoods}
      </MainLayout>
    </>
  );
}
