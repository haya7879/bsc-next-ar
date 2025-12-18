import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export default function Footer() {
  return (
    <footer>
      <div className="container-main footer-top">
        <div className="footer-col">
          <ul>
            <li>
              <Link href="/" className="footer-logo">
                <Image
                  src="/imgs/footer-logo.svg"
                  alt="bscenter-logo"
                  title="bscenter-logo"
                  width={150}
                  height={50}
                />
              </Link>
            </li>
            <li>
              <p>
                <b>مركز الأداء المتوازن للتدريب</b> <br />
                هو شريكك الاستراتيجي في تطوير المهارات وتعزيز الأداء.
              </p>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <ul>
            <li>
              <Link href="/">الصفحة الرئيسية</Link>
            </li>
            <li>
              <Link href="/about">عن المركز</Link>
            </li>
            <li>
              <Link href="/blogs">المدونات</Link>
            </li>
            <li>
              <Link href="/training-courses">التخصصات</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <ul>
            <li>
              <Link href="/join-team">انضم الى فريقنا</Link>
            </li>
            <li>
              <Link href="/sitemap">خريطة الموقع</Link>
            </li>
            <li>
              <Link href="/terms">الشروط والأحكام</Link>
            </li>
            <li>
              <Link href="/privacy-policy">سياسة الخصوصية</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <ul>
            <li>الامارات العربية المتحدة</li>
            <li>برج ذا بريزم،الخليج التجاري، دبي</li>
            <li className="info-item">
              <img src="/icons/mail.svg" alt="Mail Icon" />
              <span>info@bscenter.org</span>
            </li>
            <li className="info-item">
              <img
                src="/icons/phone_light.svg"
                style={{ marginLeft: "-3px" }}
                alt="Mobile Icon"
              />
              <span className="phone-number">+971 50 625 2099</span>
            </li>
            <li className="info-item">
              <img src="/icons/phone2.svg" alt="Phone Icon" />
              <span className="phone-number">+971 4 432 2444</span>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <ul>
            <li>المملكة المتحدة</li>
            <li>شارع Crampton 83</li>
            <li>لندن SE17 3BQ</li>
            <li className="info-item">
              <img src="/icons/mail.svg" alt="Mail Icon" />
              <span>info@bscenter.org</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="hr"></div>
      <div className="footer-bottom">
        <div className="container-main">
          <p>© حقوق النشر 2025 مركز الأداء المتوازن للتدريب</p>
          <a
            href="//www.dmca.com/Protection/Status.aspx?ID=a93d1866-cf03-48a4-9106-d51999924b5c"
            title="DMCA.com Protection Status"
            className="dmca-badge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-07.png?ID=a93d1866-cf03-48a4-9106-d51999924b5c"
              alt="DMCA.com Protection Status"
              width={150}
              height={30}
            />
          </a>
          <Script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js" />
          <div className="social-links">
            <img
              src="/icons/facebook.png"
              width="30px"
              height="30px"
              alt="facebook icon"
              title="facebook icon"
            />
            <img
              src="/icons/linkedin.png"
              width="30px"
              height="30px"
              alt="linkedin icon"
              title="linkedin icon"
            />
            <img
              src="/icons/x.png"
              width="30px"
              height="30px"
              alt="x icon"
              title="x icon"
            />
            <img
              src="/icons/instagram.png"
              width="30px"
              height="30px"
              alt="instagram icon"
              title="instagram icon"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

