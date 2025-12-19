import Image from "next/image";
import Link from "next/link";

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
            <Link href="/about">
              تعرف على المزيد
              <span className="sr-only"> عن مركز الأداء المتوازن للتدريب</span>
            </Link>
          </div>
          <div className="about-right">
            <Image src="/imgs/khda.png" alt="KHDA" width={200} height={200} />
          </div>
        </div>
      </div>
    </section>
  );
}
