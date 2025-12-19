"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted) return;
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // Check initial scroll position after a small delay to ensure component is mounted
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        handleScroll();
      }
    }, 0);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={isScrolled ? "scrolled" : ""}>
        <div className="container-main flex-between h-full!">
          <Link href="/" className="nav-logo">
            <Image
              src="/imgs/logo-en.png"
              alt="Balanced Score Training Center logo"
              width={150}
              height={150}
              priority
              quality={60}
              sizes="(max-width: 768px) 120px, 150px"
            />
          </Link>
          <div className="mobile-nav-lang-2">
            <Link
              href="https://bscenter.org"
              role="button"
              style={{ color: "#333333" }}
            >
              <h3 className="shrink-0">English courses</h3>
            </Link>
          </div>
          <div className="icon-burger" onClick={toggleMobileMenu}>
            <svg
              className="menu-icon"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0.4"
              viewBox="0 0 24 24"
              fontSize="30"
              fontWeight="900"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Menu_Fries">
                <path d="M20.437,19.937c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.002c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.002Z"></path>
                <path d="M20.437,11.5c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-10,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l10,-0.001Z"></path>
                <path d="M20.437,3.062c0.276,-0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5l-16.874,0.001c-0.276,-0 -0.5,-0.224 -0.5,-0.5c-0,-0.276 0.224,-0.5 0.5,-0.5l16.874,-0.001Z"></path>
              </g>
            </svg>
          </div>
          <div className="nav-links">
            <ul className="flex-between">
              <li>
                <Link href="/" className={isActive("/") ? "active" : ""}>
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/training-courses"
                  className={isActive("/training-courses") ? "active" : ""}
                >
                  التخصصات
                </Link>
              </li>
              <li>
                <Link
                  href="/training-cities"
                  className={isActive("/training-cities") ? "active" : ""}
                >
                  المدن
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={isActive("/about") ? "active" : ""}
                >
                  عن المركز
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={isActive("/contact") ? "active" : ""}
                >
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-search flex-between">
            <div>
              <input
                type="text"
                id="navbar-search"
                aria-label="Search"
                suppressHydrationWarning
              />
              <img src="/icons/search.svg" alt="search-icon" id="search-icon" />
            </div>
            <span className="line-search"></span>
            <div className="nav-lang">
              <Link
                className="btn"
                href="https://ar.bscenter.org"
                role="button"
                style={{ color: "#333333" }}
              >
                <h3 className="shrink-0 text-[17px]">
                  <b>English courses</b>
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div
        className="mobile-overlay"
        style={{ display: isMobileMenuOpen ? "block" : "none" }}
        onClick={closeMobileMenu}
      ></div>

      <div
        className={`nav-links-phone ${isMobileMenuOpen ? "showMobileNav" : ""}`}
      >
        <div className="flex-between mebile-menu-header">
          <Link href="/" className="nav-logo" onClick={closeMobileMenu}>
            <Image
              src="/imgs/logo-en.png"
              alt="Balanced Score Training Center logo"
              width={150}
              height={150}
              priority
              quality={60}
              sizes="(max-width: 768px) 120px, 150px"
            />
          </Link>
        </div>
        <ul className="flex-column">
          <li>
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={isActive("/") ? "active" : ""}
            >
              الصفحة الرئيسية
            </Link>
          </li>
          <li>
            <Link
              href="/training-courses"
              onClick={closeMobileMenu}
              className={isActive("/training-courses") ? "active" : ""}
            >
              التخصصات
            </Link>
          </li>
          <li>
            <Link
              href="/training-cities"
              onClick={closeMobileMenu}
              className={isActive("/training-cities") ? "active" : ""}
            >
              المدن
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={isActive("/about") ? "active" : ""}
            >
              عن المركز
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={isActive("/contact") ? "active" : ""}
            >
              اتصل بنا
            </Link>
          </li>
        </ul>
        <div className="mobile-nav-lang flex-between">
          <Link
            href="https://bscenter.org"
            role="button"
          >
            <h3 className="shrink-0">English courses</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
