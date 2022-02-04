import Head from 'next/head';
import { useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import Slider from '../components/Slider';

import Link from 'next/link';
import Image from 'next/image';
import short from '../public/img/short_underpants_icon.svg';
import kostums from '../public/img/kostum_pijamas_icon.svg';
import koftazamok from '../public/img/koftazamok_icon.svg';
import pants from '../public/img/pants_icon.svg';
import hudi from '../public/img/hudiclothing_icon.svg';

// import moduleName from '../public/img/short_icon';
// import moduleName from '../public/img/';
// import { useAppContext } from '../context/firebaseContext';
export default function Index() {
  const urlForIndexSlider = [
    {
      url: short,
      path: '/shorts',
      name: 'шорти',
    },
    {
      url: pants,
      path: '/pants',
      name: 'штани',
    },
    {
      url: kostums,
      path: '/sport-kostums',
      name: 'костюми',
    },
    {
      url: koftazamok,
      path: '/sports-jacket',
      name: 'кофти',
    },
    {
      url: hudi,
      path: '/hoodie',
      name: 'худи',
    },
  ];
  // const { good, getGood } = useAppContext();
  useEffect(() => {
    // getGood('pants');
  }, []);

  return (
    <>
      {' '}
      <Head>
        {' '}
        <title>bsywear</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <h1 className="title-product-block h1">Каталог</h1>

        <Slider
          url={urlForIndexSlider}
          autoplay={{ delay: 2000, disableOnInteraction: true }}></Slider>

        <div className="productCard_block-katalog">
          {' '}
          <div className="img">
            <Image
              alt={'pant'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/pants%2Fphoto_2021-09-18_22-23-35.jpg?alt=media&token=e4a1c5e3-bea8-4c37-8a11-b8cc96debb4a'
              }></Image>
            <h4 className="bottom-subtitle">
              <Link href="/pants">
                <a className="button button-default-white">штаны</a>
              </Link>
            </h4>
          </div>
        </div>
        <div className="productCard_block-katalog">
          {' '}
          <div className="img">
            <Image
              alt={'pant'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/hoodie%2FIMG_8824.JPG?alt=media&token=ebe1ba8f-d02b-4a61-8b17-befcdd68179f'
              }></Image>
            <h4 className="bottom-subtitle">
              <Link href="/hoodie">
                <a className="button button-default-white">худи</a>
              </Link>
            </h4>
          </div>
        </div>

        <div className="productCard_block-katalog">
          {' '}
          <div className="img">
            <Image
              alt={'pant'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/sport-kostums%2Ftonki-Nike%2Fphoto_2021-04-15_22-02-06.jpg?alt=media&token=3db7fc56-e3e4-4064-8e2c-e990dde62c02'
              }></Image>
            <h4 className="bottom-subtitle">
              <Link href="/sport-kostums">
                <a className="button button-default-white">костюмы</a>
              </Link>
            </h4>
          </div>
        </div>
        <div className="productCard_block-katalog">
          {' '}
          <div className="img">
            <Image
              alt={'pants'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/t-shirt%2Fphoto_2021-07-12_20-32-00.jpg?alt=media&token=d7c81fa7-a2c0-4b38-9205-f58da2ddf491'
              }></Image>
            <h4 className="bottom-subtitle">
              <Link href="/t-shirt">
                <a className="button button-default-white">футболки</a>
              </Link>
            </h4>
          </div>
        </div>
        <div className="productCard_block-katalog">
          {' '}
          <div className="img">
            <Image
              alt={'pants'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/shorts%2Fphoto_2021-04-08_19-59-35.jpg?alt=media&token=b0520101-c10c-467c-ac6f-4d1d17e4d71e'
              }></Image>
            <h4 className="bottom-subtitle">
              <Link href="/shorts">
                <a className="button button-default-white">шорты</a>
              </Link>
            </h4>
          </div>
        </div>
        {/* <div className="productCard_block-katalog">
          {' '}
          <h4 className="bottom-subtitle">
            <Link href="/shorts">
              <a className="button button-default-white">худи флис</a>
            </Link>
          </h4>
          <div className="img">
            <Image
              alt={'pants'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/shorts%2Fphoto_2021-04-08_19-59-35.jpg?alt=media&token=b0520101-c10c-467c-ac6f-4d1d17e4d71e'
              }></Image>
          </div>
        </div>
        <div className="productCard_block-katalog">
          {' '}
          <h4 className="bottom-subtitle">
            <Link href="/shorts">
              <a className="button button-default-white">штаны флис</a>
            </Link>
          </h4>
          <div className="img">
            <Image
              alt={'pants'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/shorts%2Fphoto_2021-04-08_19-59-35.jpg?alt=media&token=b0520101-c10c-467c-ac6f-4d1d17e4d71e'
              }></Image>
          </div>
        </div>
        <div className="productCard_block-katalog">
          {' '}
          <h4 className="bottom-subtitle">
            <Link href="/shorts">
              <a className="button button-default-white">костюмы флис</a>
            </Link>
          </h4>
          <div className="img">
            <Image
              alt={'pants'}
              width={300}
              height={400}
              src={
                'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/shorts%2Fphoto_2021-04-08_19-59-35.jpg?alt=media&token=b0520101-c10c-467c-ac6f-4d1d17e4d71e'
              }></Image>
          </div>
        </div> */}
      </MainLayout>
    </>
  );
}
