import { getCategories } from '@/services/categories/categories-services';
import CategoriesSliderClient from './categories-slider-client';

export default async function CategoriesSliderSection() {
  let categories: Category[] = [];
  
  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  // Split categories into two arrays for two sliders
  const midPoint = Math.ceil(categories.length / 2);
  const categories1 = categories.slice(0, midPoint);
  const categories2 = categories.slice(midPoint);

  return (
    <section className="categories-slider section-space-1">
      <div className="container-main">
        <div className="section-title">
          <h2>التخصصات</h2>
          {/* <CategoriesArrows /> */}
        </div>

      </div>
      <div className="flex flex-col gap-6"> 
        <CategoriesSliderClient categories={categories1} sliderId="slider1" reverseDirection={false} />
        <CategoriesSliderClient categories={categories2} sliderId="slider2" reverseDirection={true} />
      </div>
    </section>
  );
}


