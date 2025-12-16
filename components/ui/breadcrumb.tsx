import React from "react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  currentPage?: string;
}

export default function Breadcrumb({ items, currentPage }: BreadcrumbProps) {
  const breadcrumbItems: BreadcrumbItem[] = items || [
    ...(currentPage ? [{ label: currentPage }] : []),
  ];

  const finalItems: BreadcrumbItem[] =
    breadcrumbItems[0]?.href === "/" ? breadcrumbItems : [...breadcrumbItems];

  return (
    <div className="breadcrumb-bar">
      <div className="about-header container-main">
        <ul>
          {finalItems.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={index === 0 ? "main-link" : ""}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
              {index < finalItems.length - 1 && (
                <img src="/icons/arrow.svg" alt="arrow icon" className="rotate-180" />
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
