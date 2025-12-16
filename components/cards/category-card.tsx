import Link from "next/link";

interface CategoryCardProps {
  category: Category;
  categoryUrl: string;
}

export default function CategoryCard({
  category,
  categoryUrl,
}: CategoryCardProps) {
  const imageUrl = category.image || "";

  return (
    <div className="category-card mx-5">
      <Link href={categoryUrl}>
        <img
          src={imageUrl}
          alt={category.image_alt || category.title}
          loading="lazy"
        />
      </Link>
      <div className="card-overlay">
        <Link href={categoryUrl}>
          <h3 className="text-white">{category.title}</h3>
          <span className="line-card"></span>
        </Link>
        <Link href={categoryUrl} className="category-card-arrow">
          <img src="/icons/arrow.svg" alt="Arrow" className="rotate-180"/>
        </Link>
      </div>
    </div>
  );
}
