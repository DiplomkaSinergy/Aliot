import React, { FC } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { IDataItem } from './data';
import 'swiper/scss';
import 'swiper/scss/pagination';
import './autoSlider.scss';

interface IProps {
  data: IDataItem[];
  rtl?: string;
}

const AutoSlider: FC<IProps> = ({ data, rtl }) => {
  return (
    <Swiper
    className='sample-slider'
    draggable='false'
    modules={[Autoplay]}
    loop={true}
    spaceBetween={230}
    allowTouchMove={false}
      autoplay={{
        delay: 0,
        reverseDirection: true,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      breakpoints={{
        1: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
        1450: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      slidesPerView={3}
      speed={8000}
      dir={rtl}
    >
      {data.map((item, i) => (
        <SwiperSlide key={i}>
          <div className='slider__item-auto'>
            <img src={item.img} alt='img' />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { AutoSlider };
