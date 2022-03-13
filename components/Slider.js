import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "./Spinner.js";
import Link from "next/link";
import { Navigation, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import { useState, useEffect } from "react";
const Slider = ({
  url,
  id,
  grabCursor = false,
  autoplay = false,
  count = 4,
}) => {
  const [imgsObj, setImgs] = useState([
    "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505",
  ]);

  const [imgs1, setImgs1] = useState(
    "https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505"
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
    console.log(imgs1);
  };
  return (
    <>
      <Swiper
        // install Swiper modules

        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        loop={true}
        grabCursor={grabCursor}
        autoplay={autoplay}
        pagination={{ clickable: true }}
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
        }}
      >
        {imgsObj &&
        imgsObj.filter((i) => {
          return i.constructor.name === "Object";
        }).length > 0
          ? imgsObj.map((obj, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link href={obj.path}>
                    <a>
                      <div className="img-svg">
                        <Image
                          src={obj.urlSvg}
                          width={200}
                          height={200}
                          alt="logo"
                        ></Image>
                      </div>
                      <div className="bottom-subtitle">
                        <button className="button button-default-white font">
                          {obj.name}
                        </button>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })
          : imgsObj &&
            imgsObj.map((el, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="img-card-detail">
                    <Image
                      src={el}
                      width={300}
                      height={405}
                      alt="logo"
                      onClick={goToDitailSlide}
                    ></Image>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>

      {imgsObj &&
      imgsObj.filter((i) => {
        return i.constructor.name === "Object";
      }).length > 0 ? null : (
        <div className="img-detail">
          <Image src={imgs1} width={350} height={450} alt="logo"></Image>
        </div>
      )}

      <style jsx>{`
        .bottom-subtitle {
          margin-top: 0;
          text-align: center;
          margin-bottom: 40px;
        }
        .img-card-detail {
          max-width: 300px;
          margin: 0 auto;
          display: block;
          margin-bottom: 35px;
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
        .img-detail {
          display: none;
        }
        @media (min-width: 640px) {
          .img-detail {
            display: block;
          }
          .font {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </>
  );
};
export default Slider;
