import React from 'react';
import {
  Container,
} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/carouselProduct.css';
import jam from "../assets/images/jam1.png";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {
  Navigation, Pagination, Mousewheel, Keyboard,
} from 'swiper';

function CarouselProduct() {
  return (
    <Container>
      <Swiper
        cssMode
        navigation
        pagination
        mousewheel
        keyboard
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="card-carousel">
            <img src={jam} style={{ width: '100%', borderRadius: '16px' }} alt="" />
          </div>
        </SwiperSlide>
        
      </Swiper>
    </Container>
  );
}

export default CarouselProduct;