"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import CategoryCard from "@/components/cards/category-card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaChevronLeft } from "react-icons/fa6";

interface CategoriesSliderClientProps {
  categories: Category[];
}

// Shared refs across component instances
const sharedRefs = {
  prevRef: { current: null as HTMLDivElement | null },
  nextRef: { current: null as HTMLDivElement | null },
  swiperRef: { current: null as SwiperType | null },
};

export function CategoriesArrows() {
  const handlePrevClick = () => {
    if (sharedRefs.swiperRef.current) {
      sharedRefs.swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (sharedRefs.swiperRef.current) {
      sharedRefs.swiperRef.current.slideNext();
    }
  };

  return (
    <div className="arrows">
      <div
        suppressHydrationWarning
        ref={(el) => {
          sharedRefs.prevRef.current = el;
        }}
        onClick={handlePrevClick}
        className="swiper-button-prev arrow-btn"
        tabIndex={0}
        role="button"
        aria-label="Previous slide"
        style={{ cursor: "pointer" }}
      >
        <FaChevronLeft className="w-4! h-4!" color="white" />
      </div>
      <div
        suppressHydrationWarning
        ref={(el) => {
          sharedRefs.nextRef.current = el;
        }}
        onClick={handleNextClick}
        className="swiper-button-next arrow-btn"
        tabIndex={0}
        role="button"
        aria-label="Next slide"
        style={{ cursor: "pointer" }}
      >
        <FaChevronLeft className="w-4! h-4!" color="white" />
      </div>
    </div>
  );
}

export default function CategoriesSliderClient({
  categories,
}: CategoriesSliderClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div
      onMouseEnter={() => {
        if (swiperRef.current && swiperRef.current.autoplay) {
          swiperRef.current.autoplay.stop();
        }
      }}
      onMouseLeave={() => {
        if (swiperRef.current && swiperRef.current.autoplay) {
          swiperRef.current.autoplay.start();
        }
      }}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          sharedRefs.swiperRef.current = swiper;
        }}
        slidesPerView={1}
        spaceBetween={8}
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        speed={3000}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="mySwiper2"
      >
        {categories?.map((category) => (
          <SwiperSlide key={category.slug || category.id}>
            <CategoryCard
              category={category}
              categoryUrl={`/training-courses/${category.slug}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
