//@ts-nocheck


import React, { FC, useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { IData } from './data';
import Slider from 'react-slick';

import './ProductSlider.scss'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

interface IProps {
    data: IData[]
}

const ProductSlider: FC<IProps> = ({data}) => {
    // const settings = {
    //     customPaging: function(i: number) {
    //       return (
    //         <a>
    //           <img src={data[i].img} />
    //         </a>
    //       );
    //     },
    //     dots: true,
    //     dotsClass: "",
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    //   };

  return (
    <div className='ProductSlider'>  

        <Carousel
        showStatus={false}
        showIndicators={false}
        // width={600}
        className='sssssssss'
        >
            {data.map(item => (
                <div className="ProductSlider__item">
                    <img src={item.img} alt="img" />
                </div>
            ))}
        </Carousel>
        {/* <Slider {...settings}>
            
        </Slider> */}
    </div>
  )
}

export {ProductSlider}