import Image from "next/image";

export default function ExpertTrainersSection() {
  return (
    <section className="relative bg-[#EBF5FF] section-space-2 py-6! lg:py-0!">
      <div className="container-main px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="w-full max-w-[300px] sm:max-w-[370px] translate-y-0 lg:-translate-y-[40px] order-2 lg:order-1">
            <Image
              src="/imgs/about-img3.png"
              alt="المدربون الخبراء - يجمع مدربونا المتميزون بين الخبرة الأكاديمية والخبرة العملية"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
              quality={90}
            />
          </div>
          <div className="flex-1 w-full order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3!">
              المدربون الخبراء
            </h2>
            <p className="text-sm sm:text-base leading-[1.8]">
              يجمع مدربونا المتميزون بين الخبرة الأكاديمية والخبرة العملية،
              باستخدام التطبيقات العملية ودراسات الحالة والتقنيات التفاعلية
              لضمان تعلم فعّال وتطبيق عملي.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
