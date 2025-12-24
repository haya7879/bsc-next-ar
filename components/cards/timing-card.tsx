"use client";

import Link from "next/link";
import { useDownloadPopupStore } from "@/lib/store/download-popup-store";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa6";

interface TimingCardProps {
  timing: {
    id: number;
    start_date: string;
    end_date: string;
    fees: string;
    duration: number;
    city_id: number;
    city?: {
      id: number;
      title: string;
      slug: string;
    };
  };
  courseSlug: string;
  course?: {
    id: number;
    title: string;
    slug: string;
    description?: string;
    content?: string;
    image?: string;
    code?: string;
    duration?: number;
    category?: {
      id: number;
      title: string;
      slug: string;
    };
  };
}

export default function TimingCard({
  timing,
  courseSlug,
  course,
}: TimingCardProps) {
  const router = useRouter();
  const cityName = timing.city?.title || "Unknown";
  const citySlug = timing.city?.slug || "";
  const openPopup = useDownloadPopupStore((state) => state.openPopup);

  // City course page URL
  const cityCourseUrl = citySlug
    ? `/training-course/${courseSlug}/${citySlug}`
    : `/training-course/${courseSlug}`;

  // Format date as DD-MM-YYYY
  const formatDateFull = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!course) {
      // If course data is not available, redirect to course page
      window.location.href = `/training-course/${courseSlug}`;
      return;
    }

    openPopup(course, timing);
  };

  return (
    <div
      className="timing-card-grid cursor-pointer"
      onClick={() => router.push(cityCourseUrl)}
      style={{ cursor: "pointer" }}
    >
      <div className="timing-card-header px-3!">
        <div className="timing-location">
          <img
            src="/icons/location.svg"
            alt="Location"
            className="w-4.5 h-4.5"
          />
          <span className="sm:text-[15px] text-sm">{cityName}</span>
        </div>
        <div className="timing-price">
        الرسوم: {parseFloat(timing.fees).toLocaleString("en-US")}$
        </div>
      </div>
      <span className="border-b border-[#E4E4E4]"></span>
      <div className="timing-dates-grid px-3!">
        <div className="date-from">
          من: {" "}
          <span className="date-value-green">
            {formatDateFull(timing.start_date)}
          </span>
        </div>
        <div className="date-to">
          إلى: {" "}
          <span className="date-value-red">
            {formatDateFull(timing.end_date)}
          </span>
        </div>
      </div>
      <span className="border-b border-[#E4E4E4]"></span>
      <div className="timing-actions-grid px-3!">
        <button
          onClick={handleDownloadPDF}
          className="btn-pdf"
          suppressHydrationWarning={true}
        >
          {/* <FaDownload/> */}
          PDF
        </button>
        <Link
          href={`/register?timing_id=${timing.id}&course_slug=${courseSlug}`}
          className="btn-register"
          onClick={(e) => e.stopPropagation()}
        >
          تسجيل
        </Link>
        <Link
          href={`/enquire?timing_id=${timing.id}&course_slug=${courseSlug}`}
          className="btn-enquire"
          onClick={(e) => e.stopPropagation()}
        >
          استفسار
        </Link>
      </div>
    </div>
  );
}
