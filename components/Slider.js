import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Image from 'next/image';
import { useState, useEffect } from 'react';
const Slider = ({ url, id, grabCursor = false }) => {
  console.log(url);
  const [imgs, setImgs] = useState([
    'https://firebasestorage.googleapis.com/v0/b/b-sportwear-shop.appspot.com/o/no_image.png?alt=media&token=47b4ea63-cf4a-4b67-9fa7-8e8004f97505',
  ]);
  useEffect(() => {
    setImgs(url);
  }, []);
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        grabCursor={grabCursor}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        {imgs !== undefined
          ? imgs.map((img, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="img">
                    <Image src={img} width={300} height={405} alt="logo"></Image>
                  </div>
                </SwiperSlide>
              );
            })
          : null}
      </Swiper>
    </>
  );
};
export default Slider;
