import Link from "next/link";
import Image from "next/image";
import { HiChevronLeft } from "react-icons/hi2";

export default function CityCard({ city }: { city: City }) {
  return (
    <Link key={city.slug} href={`/training-cities/${city.slug}`} className="city-card">
      <Image
        src={city?.image || ""}
        alt={city.image_alt || city.title}
        title={city.image_title || city.title}
        className="card-img"
        width={400}
        height={300}
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
