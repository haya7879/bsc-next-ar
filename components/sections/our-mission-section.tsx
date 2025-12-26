import Image from "next/image";

export default function OurMissionSection() {
  return (
    <section className="section-space-2">
      <div className="container-main flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">
        <div className="">
          <h2 className="text-2xl sm:text-3xl font-semibold  mb-3!">
            رسالتنا
          </h2>
          <div className="">
            <p className="text-sm sm:text-base leading-[1.8]">
              نسعى لتعزيز الأداء المؤسسي من خلال تطوير رأس المال البشري
              وتعزيز النمو المستدام عبر حلول تدريبية واستشارية مبتكرة.
            </p>
            <p className="text-sm sm:text-base leading-[1.8]">
              نهدف لأن نكون شريكًا استراتيجيًا موثوقًا في بناء بيئات عمل عالية
              الأداء وتنافسية.
            </p>
          </div>
        </div>
        <div className="w-full max-w-[250px] sm:max-w-[300px]">
          <Image
            src="/imgs/about-img2.png"
            alt="رسالتنا - الأهداف والغايات الاستراتيجية"
            width={400}
            height={400}
            className=""
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
