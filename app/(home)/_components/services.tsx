import { servicesData } from "@/constants";

export default function Services() {
  return (
    <section className="search-courses services">
      <div className="container-main">
        <h2>خدماتنا</h2>
        <div className="service-cards">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-svg">
                <img src={service.icon} alt={service.title} />
              </div>
              <h5>{service.title}</h5>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
