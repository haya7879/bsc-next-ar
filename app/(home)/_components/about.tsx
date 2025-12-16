import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="search-courses about-us">
      <div className="container-main">
        <div className="about">
          <div className="about-left">
            <h2>
              حول <strong>مركز Balanced Score للتدريب</strong>
            </h2>
            <p>
              مركز Balanced Score للتدريب – شريكك الاستراتيجي في التطوير والتميز.
              منذ عام 1996، نقدم حلول تدريب واستشارات مبتكرة على مستوى عالمي مصممة
              لتمكين الأفراد والمنظمات، ومساعدتهم على الازدهار في بيئة الأعمال التنافسية سريعة التطور اليوم.
            </p>
            <a href="https://bscenter.org/about">تعرف على المزيد</a>
          </div>
          <div className="about-right">
            <Image src="/imgs/khda.png" alt="KHDA" width={200} height={200} />
          </div>
        </div>
      </div>
    </section>
  )
}
