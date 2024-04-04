import React from 'react'

import { Swiper, SwiperSlide, } from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules'
import { data } from './data';

import 'swiper/scss';
import 'swiper/scss/pagination';

import './ActiveSlider.scss'


const ActiveSlider = () => {

    const pagination = {
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return '<div class="sw-act ' + className + '">' + '</div>';
        },
      };
  
  return (
    <section className='slider'>
        <div className="container">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                pagination={pagination}
                className='mySwiper'
                >
                    {data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className="slider__item">
                                <img src={item.img} alt="img" />
                                <div className="slider__item-description">
                                    <div className="slider__item-description-title">{item.title}</div>
                                    <div className="slider__item-description-subtitle">{item.subtitle}</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    </section>
  )
}

export {ActiveSlider}