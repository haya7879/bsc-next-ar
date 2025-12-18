import Link from "next/link";
import Image from "next/image";
import { HiChevronRight } from "react-icons/hi2";

interface CategoryCardProps {
  category: Category;
  categoryUrl: string;
}

function stableNumberBetween(value: string, min: number, max: number) {
  // Deterministic "random" number to avoid hydration mismatch (SSR/CSR).
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  const range = max - min + 1;
  const normalized = Math.abs(hash) % range;
  return min + normalized;
}

export default function CategoryCard({
  category,
  categoryUrl,
}: CategoryCardProps) {
  const imageUrl = category.image || "";

  return (
    <>
      {category && (
        <Link
          href={categoryUrl}
          className="group w-full rounded-2xl cursor-pointer relative block h-[150px] overflow-hidden transition-all duration-500"
        >
          <Image
            src={imageUrl || ""}
            alt={category.image_alt || category.title}
            width={400}
            height={300}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <span className="absolute inset-0 rounded-2xl opacity-70 bg-[#134E88]" />
          <div className="relative z-10 py-3!">
            <h3 className="text-white text-lg font-semibold px-4! line-clamp-3">
              {category.title}
            </h3>
          </div>
        </Link>
      )}
    </>
  );
}
