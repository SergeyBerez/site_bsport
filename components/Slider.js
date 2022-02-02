import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from './Spinner.js';
import Link from 'next/link';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const Slider = ({ url, id, grabCursor = false, autoplay = false, count = 3 }) => {
  const [imgs, setImgs] = useState([
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  ]);

  const [imgs1, setImgs1] = useState(
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  );
  useEffect(() => {
    if (url) {
      setImgs(url);
    }
  }, []);

  const findimg = (i) => {
    const index = Math.floor(i / 2 - 1);

    if (index == -1) {
      index = 0;
      setImgs1(url[index]);
    }
  };
  const goToDitailSlide = (e) => {
    const src = e.currentTarget.src;

    setImgs1(src);
  };
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        loop={true}
        grabCursor={grabCursor}
        autoplay={autoplay}
        // pagination={{ clickable: true }}
        onSwiper={(swiper) => findimg(swiper.activeIndex)}
        // onSlideChange={(swiper) => findimg(swiper.activeIndex)}
        breakpoints={{
          300: {
            slidesPerView: count,
            spaceBetween: 5,
          },
          340: {
            slidesPerView: count,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}>
        {imgs &&
        imgs.filter((i) => {
          return i.constructor.name === 'Object';
        }).length > 0
          ? url.map((obj, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link href={obj.path}>
                    <a>
                      <div className="img">
                        <Image src={obj.url} width={300} height={405} alt="logo"></Image>
                      </div>
                      <div className="bottom-subtitle">
                        <button className="button button-default-white font">{obj.name}</button>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })
          : imgs &&
            imgs.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="img">
                    <Image
                      src={el}
                      width={300}
                      height={405}
                      alt="logo"
                      onClick={goToDitailSlide}></Image>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>

      {imgs &&
      imgs.filter((i) => {
        return i.constructor.name === 'Object';
      }).length > 0 ? null : (
        <div className="img">
          <Image src={imgs1} width={300} height={405} alt="logo"></Image>
        </div>
      )}

      <style jsx>{`
        .bottom-subtitle {
        }
        .font {
          border: none;
          padding: 0;
          font-size: 1rem;
        }
        .font:hover {
          background-color: transparent;
          color: black;
          cursor: pointer;
        }
        @media (min-width: 640px) {
          .font {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
};
export default Slider;
