import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="search-courses about-us">
      <div className="container-main">
        <div className="about">
          <div className="about-left">
            <h2>
              نبذة عن <strong>مركز الأداء المتوازن للتدريب</strong>
            </h2>
            <p>
              مركز الأداء المتوازن للتدريب – شريكك الاستراتيجي في التطوير
              والتميز. منذ عام 1996، نقدم حلولًا تدريبية واستشارية مبتكرة، مصممة
              وفق أحدث المعايير العالمية، لنرتقي بمهارات الأفراد والمؤسسات
              ونواكب تطورات عالم الأعمال المتسارع
            </p>
            <a href="https://bscenter.org/about">تعرف على المزيد</a>
          </div>
          <div className="about-right">
            <Image src="/imgs/khda.png" alt="KHDA" width={200} height={200} />
          </div>
        </div>
      </div>
    </section>
  );
}
