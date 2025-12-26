import Image from "next/image";

export default function WhoWeAreSection() {
  return (
    <section className="relative bg-[#EBF5FF] mt-0! md:mt-20! py-6! lg:py-0!">
      <div className="container-main px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="w-full max-w-[300px] sm:max-w-[370px] translate-y-0 lg:-translate-y-[40px] order-2 lg:order-1">
            <Image
              src="/imgs/about-img1.png"
              alt="من نحن - فريق مركز التدريب"
              width={400}
              height={400}
              className="w-full h-auto object-contain"
              quality={90}
            />
          </div>
          <div className="flex-1 w-full order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3!">
              من نحن؟
            </h2>
            <p className="text-sm sm:text-base leading-[1.8]">
              تأسس مركز الأداء المتوازن للتدريب عام 1996 كشريك استراتيجي في
              تقديم حلول تدريبية واستشارية شاملة، بهدف تمكين الأفراد
              والمؤسسات لتحقيق التميز والاستدامة في بيئات العمل التنافسية.
              بفضل عقود من الخبرة ونهج مبتكر، يقدم المركز برامج متخصصة مصممة
              وفقًا لأحدث المعايير الدولية، تغطي القيادة والإدارة والتطوير
              المهني. تساهم هذه البرامج في بناء القدرات المستدامة وتعزيز ثقافة
              الابتكار. وبوجود عالمي، يواصل المركز تجهيز عملائه لمواجهة
              التحديات والتغيرات السريعة في عالم الأعمال.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
