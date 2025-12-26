import Image from "next/image";

export default function OurServicesSection() {
  const services = [
    {
      id: 1,
      title: "التدريب الحضوري",
      icon: "/icons/serv-icon1.svg",
      desc: "برامج تفاعلية تُعقد في مواقع متميزة للتعلم العملي",
    },
    {
      id: 2,
      title: "التدريب الداخلي",
      icon: "/icons/serv-icon3.svg",
      desc: "حلول مخصصة لتعزيز أداء الفريق وتتماشى مع أهداف العمل.",
    },
    {
      id: 3,
      title: "التدريب الإلكتروني",
      icon: "/icons/serv-icon2.svg",
      desc: "دورات مرنة وعالية الجودة متاحة في أي وقت وأي مكان",
    },
  ];

  return (
    <section className="bg-white relative py-8! section-space-2">
      <div className="container-main px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold md:mb-6! mb-3!">
          خدماتنا
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-8 md:gap-10 lg:gap-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center justify-center w-full sm:w-auto"
            >
              <div className="bg-[#Ebf5ff] rounded-full w-20 h-20 md:w-22 md:h-22 flex items-center justify-center mb-4!">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
              </div>
              <h3 className="text-[#134E88] text-base sm:text-lg md:text-xl font-semibold text-center">
                {service.title}
              </h3>
              <p className="text-sm leading-[1.6] text-center mt-1!">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
