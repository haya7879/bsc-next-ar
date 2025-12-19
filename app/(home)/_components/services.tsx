import { servicesData } from "@/constants";
import Image from "next/image";

export default function Services() {
  return (
    <section className="services-section section-space-1">
      <div className="container-main">
        <div className="section-title">
          <h2>خدماتنا</h2>
        </div>
        <div className="service-cards">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-svg">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={80}
                  height={80}
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
