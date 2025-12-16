import CityCard from "../cards/city-card";

interface CitiesGridProps {
  cities: City[] | null;
}

export default function CitiesGrid({ cities }: CitiesGridProps) {
  return (
    <section>
      <div className="container-main">
        <div className="cities-cards-container">
          {cities?.map((city) => (
            <CityCard key={city.slug} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
