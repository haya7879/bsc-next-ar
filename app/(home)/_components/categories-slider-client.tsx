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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
  // Ensure Swiper's Navigation module gets properly bound to these external elements,
  // even when the arrows are rendered outside the <Swiper /> tree.
  useEffect(() => {
    const swiper = sharedRefs.swiperRef.current;
    const prevEl = sharedRefs.prevRef.current;
    const nextEl = sharedRefs.nextRef.current;

    if (!swiper || !prevEl || !nextEl) return;
    if (
      typeof swiper.params.navigation === "boolean" ||
      !swiper.params.navigation
    )
      return;

    swiper.params.navigation.prevEl = prevEl;
    swiper.params.navigation.nextEl = nextEl;

    // Re-init/update is required when navigation elements are assigned after init.
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

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
          sharedRefs.nextRef.current = el;
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
      <div
        suppressHydrationWarning
        ref={(el) => {
          sharedRefs.prevRef.current = el;
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
        onInit={(swiper) => {
          const prevEl = sharedRefs.prevRef.current;
          const nextEl = sharedRefs.nextRef.current;

          if (!prevEl || !nextEl) return;
          if (
            typeof swiper.params.navigation !== "boolean" &&
            swiper.params.navigation
          ) {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        navigation
        slidesPerView={1}
        spaceBetween={8}
        // Provide left/right breathing room on smaller screens
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        speed={3000}
        breakpoints={{
          360: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
          },
          400: {
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
