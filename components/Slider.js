import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from './Spinner.js';
import Link from 'next/link';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const Slider = ({ url, id, grabCursor = false, autoplay = false, count = 3 }) => {
  console.log(
    url.filter((i) => {
      return i.constructor.name === 'Object';
    }).length > 0,
  );
  const [imgs, setImgs] = useState([
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  ]);
  useEffect(() => {
    if (url) {
      setImgs(url);
    }
  }, []);
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        // navigation
        loop={true}
        grabCursor={grabCursor}
        autoplay={autoplay}
        // pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
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
        {url.filter((i) => {
          return i.constructor.name === 'Object';
        }).length > 0
          ? url.map((obj, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="img">
                    <Image src={obj.url} width={300} height={405} alt="logo"></Image>
                  </div>
                  <h4 className="bottom-subtitle">
                    <Link href={obj.path}>
                      <a className="button button-default-white font">{obj.name}</a>
                    </Link>
                  </h4>
                </SwiperSlide>
              );
            })
          : url.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="img">
                    <Image src={el} width={300} height={405} alt="logo"></Image>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>

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
        }
      `}</style>
    </>
  );
};
export default Slider;
