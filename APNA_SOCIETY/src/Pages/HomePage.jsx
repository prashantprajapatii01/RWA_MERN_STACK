import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import Notice from "../Components/Notice"

import Resident from "../Components/ResidentDirectory"


import About from '../Components/About'

import { getNotice } from "../Redux/ActionCreators/NoticeActionCreators"

import Complaint from '../Components/Complaint';
import EventBoard from '../Components/EventBoard';
export default function HomePage() {

 


  let sliderOptions = {
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false,
    loop: true,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    modules: [Pagination, Autoplay]
  }



  return (
    <>
     

<section id="hero">
  <div className="hero-swiper" style={{ position: "relative", zIndex: -1 }}>
    <Swiper className="mySwiper" {...sliderOptions}>

      {/* Slide 1 */}
      <SwiperSlide className='hero-wrapper'>
        <div className="hero-slide hero-slider-one" style={{ height: 550 }}>
          <div className="container">
            <div className="col-lg-6">
              <div className="wrapper-section">
                <div className="wrapper-info">
                  <h5 className="wrapper-subtitle text-light">
                    WELCOME TO <span className="wrapper-inner-title">RWA</span>
                  </h5>
                  <h4 className="wrapper-details text-light">
                    A smart and connected community platform to manage complaints, notices, and daily activities for residents.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className='hero-wrapper'>
        <div className="hero-slide hero-slider-two" style={{ height: 550 }}>
          <div className="container">
            <div className="col-lg-6">
              <div className="wrapper-section">
                <div className="wrapper-info">
                  <h5 className="wrapper-subtitle text-light">
                    EASY <span className="wrapper-inner-title">COMPLAINTS</span>
                  </h5>
                  <h4 className="wrapper-details text-light">
                    Raise and track complaints seamlessly. Stay updated with real-time status and quick resolutions by admin.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide className='hero-wrapper'>
        <div className="hero-slide hero-slider-three" style={{ height: 550 }}>
          <div className="container">
            <div className="col-lg-6">
              <div className="wrapper-section">
                <div className="wrapper-info">
                  <h5 className="wrapper-subtitle text-light">
                    COMMUNITY <span className="wrapper-inner-title">NOTICES</span>
                  </h5>
                  <h4 className="wrapper-details text-light">
                    Stay informed with important announcements, events, and updates from your society management.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 4 */}
      <SwiperSlide className='hero-wrapper'>
        <div className="hero-slide hero-slider-four" style={{ height: 550 }}>
          <div className="container">
            <div className="col-lg-6">
              <div className="wrapper-section">
                <div className="wrapper-info">
                  <h5 className="wrapper-subtitle text-light">
                    SAFE & <span className="wrapper-inner-title">SECURE</span>
                  </h5>
                  <h4 className="wrapper-details text-light">
                    Enhance security with digital records, verified residents, and controlled access for a safer living environment.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 5 */}
      <SwiperSlide className='hero-wrapper'>
        <div className="hero-slide hero-slider-five" style={{ height: 550 }}>
          <div className="container">
            <div className="col-lg-6">
              <div className="wrapper-section">
                <div className="wrapper-info">
                  <h5 className="wrapper-subtitle text-light">
                    SMART <span className="wrapper-inner-title">MANAGEMENT</span>
                  </h5>
                  <h4 className="wrapper-details text-light">
                    Simplify society management with digital tools for maintenance, communication, and efficient administration.
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <div className="swiper-pagination"></div>

    </Swiper>
  </div>
</section>


  
      <Notice />
      <EventBoard/>
      <Complaint/>
    

      <About />
   
    </>
  )
}
