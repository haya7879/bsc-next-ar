"use client";

import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { heroSlides } from "@/constants";
import HeroSearchForm from "./hero-search-form";

export default function Hero() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [hasFormContent, setHasFormContent] = useState(false);

  // Control autoplay based on form content
  useEffect(() => {
    if (swiperRef.current?.autoplay) {
      if (hasFormContent) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  }, [hasFormContent]);

  return (
    <div className="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onInit={(swiper) => {
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        allowTouchMove={false}
        loop={false}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        speed={1000}
        className="mySwiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="img-container">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="overlay"></div>
              <div className="content">
                <div className="hero-content-left">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                </div>
                <div className="hero-content-right">
                  <HeroSearchForm onFormContentChange={setHasFormContent} />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div ref={prevRef} className="swiper-button-prev hero-btn"></div>
      <div ref={nextRef} className="swiper-button-next hero-btn"></div>
      <div className="swiper-pagination"></div> */}
    </div>
  );
}
