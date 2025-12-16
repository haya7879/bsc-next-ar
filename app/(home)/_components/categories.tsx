import { getCategories } from '@/services/categories/categories-services';
import CategoriesSliderClient, { CategoriesArrows } from './categories-slider-client';

export default async function CategoriesSliderSection() {
  let categories: Category[] = [];
  
  try {
    categories = await getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <section className="search-courses categories-home categories">
      <div className="container-main">
        <div className="section-title">
          <h2>التخصصات</h2>
          <CategoriesArrows />
        </div>
      </div>
      <CategoriesSliderClient categories={categories} />
    </section>
  );
}

