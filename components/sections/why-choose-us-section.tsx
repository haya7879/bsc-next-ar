import Image from "next/image";

export default function WhyChooseUsSection() {
  return (
    <section className="section-space-2">
      <div className="container-main flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">
        <div className="">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3!">
            لماذا تختارنا
          </h2>
          <div className="">
            <p className="text-sm sm:text-base leading-[1.8]">
              ندمج الابتكار والتكنولوجيا والمنهجيات المثبتة لتقديم تدريب عالي
              الجودة يركز على النتائج. بدعم من فريق من الخبراء، نقدم دعمًا
              مستمرًا لمساعدة المؤسسات والمهنيين على تحقيق النجاح المستدام
              والقيادة الصناعية.
            </p>
          </div>
        </div>
        <div className="w-full max-w-[300px] sm:max-w-[370px]">
          <Image
            src="/imgs/about-img4.png"
            alt="لماذا تختارنا - التزامنا بالتميز"
            width={400}
            height={400}
            className="rotate-y-180"
            quality={90}
          />
        </div>
      </div>
    </section>
  );
}
