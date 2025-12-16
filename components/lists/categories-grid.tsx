import CategoryCard from "../cards/category-card";

export default function CategoriesGrid({
  categories,
  showSectionTitle = false,
}: {
  categories: Category[];
  showSectionTitle?: boolean;
}) {
  return (
    <section className="categories-section">
      <div className="container-main">
        {showSectionTitle && (
          <div className="section-title">
            <h2>Categories</h2>
          </div>
        )}
        <div className="categories-cards" id="category-data" data-categories="">
          {categories?.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              categoryUrl={`/training-courses/${category.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
