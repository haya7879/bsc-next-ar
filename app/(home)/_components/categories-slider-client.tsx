"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import CategoryCard from "@/components/cards/category-card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface CategoriesSliderClientProps {
  categories: Category[];
  sliderId?: string;
  reverseDirection?: boolean;
}

// Store refs for each slider instance
const sliderRefs = new Map<
  string,
  {
    prevRef: React.MutableRefObject<HTMLDivElement | null>;
    nextRef: React.MutableRefObject<HTMLDivElement | null>;
    swiperRef: React.MutableRefObject<SwiperType | null>;
  }
>();

function getOrCreateRefs(id: string) {
  if (!sliderRefs.has(id)) {
    sliderRefs.set(id, {
      prevRef: { current: null },
      nextRef: { current: null },
      swiperRef: { current: null },
    });
  }
  return sliderRefs.get(id)!;
}

export function CategoriesArrows({
  sliderId = "default",
}: {
  sliderId?: string;
}) {
  const refs = getOrCreateRefs(sliderId);

  const handlePrevClick = () => {
    if (refs.swiperRef.current) {
      refs.swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (refs.swiperRef.current) {
      refs.swiperRef.current.slideNext();
    }
  };

  return (
    <div className="arrows">
      <div
        suppressHydrationWarning
        ref={(el) => {
          refs.prevRef.current = el;
        }}
        onClick={handlePrevClick}
        className="arrow-btn"
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
          refs.nextRef.current = el;
        }}
        onClick={handleNextClick}
        className="arrow-btn"
        tabIndex={0}
        role="button"
        aria-label="Next slide"
        style={{ cursor: "pointer" }}
      >
        <FaChevronRight className="w-4! h-4!" color="white" />
      </div>
    </div>
  );
}

export default function CategoriesSliderClient({
  categories,
  sliderId = "default",
  reverseDirection = false,
}: CategoriesSliderClientProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const refs = getOrCreateRefs(sliderId);

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
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          refs.swiperRef.current = swiper;
        }}
        onInit={(swiper) => {
          const prevEl = refs.prevRef.current;
          const nextEl = refs.nextRef.current;

          if (prevEl && nextEl) {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevEl;
              swiper.params.navigation.nextEl = nextEl;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }
        }}
        navigation={false}
        slidesPerView={1}
        spaceBetween={8}
        // Provide left/right breathing room on smaller screens
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverseDirection,
        }}
        loopAdditionalSlides={5}
        // allowTouchMove={false}
        speed={7000}
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
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
