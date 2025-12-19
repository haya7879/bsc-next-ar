import Link from "next/link";
import Image from "next/image";
import { HiChevronLeft } from "react-icons/hi2";

export default function CityCard({ city }: { city: City }) {
  return (
    <Link
      key={city.slug}
      href={`/training-cities/${city.slug}`}
      className="city-card"
    >
      <Image
        src={city.image || " "}
        alt={city.image_alt || city.title}
        title={city.image_title || city.title}
        className="card-img"
        width={400}
        height={300}
        loading="lazy"
        quality={75}
        sizes="(max-width: 400px) 200px, (max-width: 768px) 240px, (max-width: 1024px) 280px, 300px"
      />
      <div>
        <span>
          <HiChevronLeft color="black" fontSize={22} className="card-arrow" />
        </span>
        <h2 className="city-card-title">{city.title}</h2>
      </div>
    </Link>
  );
}
