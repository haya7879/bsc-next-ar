import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

export default function CityCard({ city }: { city: City }) {
  return (
    <Link key={city.slug} href={`/training-cities/${city.slug}`} className="city-card">
      <img
        src={city.image}
        alt={city.image_alt || city.title}
        title={city.image_title || city.title}
        className="card-img"
        loading="lazy"
      />
      <div>
        <span>
          <HiChevronLeft color="black" fontSize={22} className="card-arrow" />
        </span>
        <h3>{city.title}</h3>
      </div>
    </Link>
  );
}
