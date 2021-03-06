import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';

import MainLayout from '../components/MainLayout';
import Slider from '../components/Slider';
import mainImage from '../public/static/image-main/iStock-508454326-e1494427400785.webp';
import mainImage2 from '../public/static/image-main/Dafne-bastiaan.webp';
import Link from 'next/link';
import Image from 'next/image';
import short from '../public/static/img/short_underpants_icon.svg';
import kostums from '../public/static/img/kostum_pijamas_icon.svg';
import koftazamok from '../public/static/img/koftazamok_icon.svg';
import pants from '../public/static/img/pants_icon.svg';
import hudi from '../public/static/img/hudiclothing_icon.svg';
import { Spinner } from '../components/Spinner';

export default function Index() {
  const [loading, setLoading] = useState(true);

  const divBackgroundEl = useRef(null);

  useEffect(() => {
    setLoading(false);
  }, []);
  const DataSvgForSlider = [
    {
      urlSvg: short,
      path: 'shorts',
      name: 'шорти',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2022-01-25_14-13-53_3_.webp?alt=media&token=dbba9899-8386-420e-8f06-7cd9b5e534d8',
    },
    {
      urlSvg: pants,
      path: 'pants',
      name: 'штани',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-04-08_19-57-15.webp?alt=media&token=2548d1a0-1660-48b4-beb5-3256e65afcab',
    },
    {
      urlSvg: kostums,
      path: 'sport-kostums',
      name: 'костюми',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-04-15_22-15-52.webp?alt=media&token=acc72733-fb20-407c-9d14-7b32dda573b2',
    },
    {
      urlSvg: koftazamok,
      path: 'sports-jacket',
      name: 'кофти',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2022-03-28_10-33-46.jpg?alt=media&token=1d10b2a5-15fa-455c-b200-45cd474725ae',
    },
    {
      urlSvg: hudi,
      path: 'hoodie',
      name: 'худи',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2022-03-28_10-21-40.jpg?alt=media&token=43650e4b-bd78-4493-90df-cc8d887f3915',
    },
    {
      urlSvg: hudi,
      path: 't-shirt',
      name: 'футболки',
      urlImg:
        'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/photo_2021-07-12_20-32-00.webp?alt=media&token=e14ee5e9-d4cc-4a64-97b9-42c0bf779779',
    },
  ];

  return (
    <>
      <Head>
        {' '}
        <title>Чоловічі спортивні штани оптом купити</title>
        <meta
          name="description"
          content="Чоловічі спортивні штани оптом від виробника купити в інтернет магазині ➔ . У нас: ✓ великий вибір чоловічих спортивних штанів оптом, ✔ високий рівень сервісу ₴ самі низькі ціни і ✈ доставка по всій Україні: Хмельницький, Одеса, Київ."
        />
        <meta
          name="keywords"
          content="спортивні штани, спортивні штани чоловічі, спортивні штани оптом, чоловічі штани, штани адідас, спортивні штани адідас, спортивні штани, фітнес одяг, спортивні штани україна, спортивні штани оптом ,базар, штани ціна, штани магазин, штани ціна,"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout cls={'container-index'}>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <>
            <h1 className="title-product-block h1">головна</h1>
            <Slider
              urlArr={DataSvgForSlider}
              params={DataSvgForSlider}
              autoplay={{ delay: 2000, disableOnInteraction: true }}></Slider>

            <div className="bottom-title">
              <Link href="/catalog">
                <a className={'a'}>
                  <button className="button button-default-black">перейди до каталогу</button>
                </a>
              </Link>
            </div>
            <Image alt="sportsmen" src={mainImage} width={1260} height={600}></Image>
            <div className="bottom-title-second">
              <Link href="/catalog">
                <a className={'a'}>
                  <button className="button button-default-black">перейди до каталогу</button>
                </a>
              </Link>
            </div>
            <Image alt="sportsmen" src={mainImage2} width={1260} height={600}></Image>
          </>
        )}
      </MainLayout>
    </>
  );
}
