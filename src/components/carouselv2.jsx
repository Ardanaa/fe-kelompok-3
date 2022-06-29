import React from "react";
import imgBanner from "../assets/images/imgBanner.png";
import imgBanner2 from "../assets/images/imgBanner-2.jpg";
import imgBanner3 from "../assets/images/imgBanner-3.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";
import "../css/carouselV2.css"

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        centeredSlides={true}
        slidesPerView={"auto"}
        grabCursor={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper mt-5"
      >
        <SwiperSlide>
          <img src={imgBanner} alt="imageBanner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgBanner2} alt="imageBanner" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imgBanner3} alt="imageBanner" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
