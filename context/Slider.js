import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';

const Slider = () => {
  return (
    <div className="container">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        <SwiperSlide>
          {' '}
          <img
            src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true"
            alt="headphones"
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <img
            src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones4.png?raw=true"
            alt="headphones"
          />
          2
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <img
            src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones5.png?raw=true"
            alt="headphones"
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <img
            src="https://github.com/BlackStar1991/CardProduct/blob/master/app/img/goods/item1/phones3.png?raw=true"
            alt="headphones"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Slider;
