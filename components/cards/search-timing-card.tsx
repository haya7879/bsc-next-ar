"use client";

import Link from "next/link";
import { useDownloadPopupStore } from "@/lib/store/download-popup-store";
import { formatDate } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa6";

interface SearchTimingCardProps {
  timing: SearchTiming;
}

export default function SearchTimingCard({ timing }: SearchTimingCardProps) {
  const openPopup = useDownloadPopupStore((state) => state.openPopup);
  const coursePageUrl = `/training-course/${timing.course_slug}`;
  const router = useRouter()

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Create course object for popup
    const course = {
      id: 0, // SearchTiming doesn't have course id
      title: timing.course_title,
      slug: timing.course_slug,
      category: timing.category_slug
        ? {
            id: timing.category_id,
            title: timing.category_title,
            slug: timing.category_slug,
          }
        : undefined,
    };

    // Create timing object for popup
    const timingForPopup = {
      id: timing.id,
      start_date: timing.start_date,
      end_date: timing.end_date,
      fees: timing.fees,
      duration: timing.duration,
      city_id: 0, // SearchTiming doesn't have city_id
      city: {
        id: 0,
        title: timing.city_title,
        slug: timing.city_slug,
      },
    };

    openPopup(course, timingForPopup);
  };

  return (
    <div 
      className="timing-card-grid cursor-pointer" 
      onClick={() => router.push(coursePageUrl)}
      style={{ cursor: 'pointer' }}
    >
      {/* Course Title */}
        <h3 className="text-sm font-semibold text-[#253a7b] px-3! h-[40px] line-clamp-2">
          {timing.course_title}
        </h3>
      <span className="border-b border-[#E4E4E4]"></span>
      
      <div className="timing-card-header px-3!">
        <div className="timing-location">
          <img src="/icons/location.svg" alt="Location" className="w-4.5 h-4.5" />
          <span>{timing.city_title}</span>
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
            {formatDate(timing.start_date)}
          </span>
        </div>
        <div className="date-to">
          إلى: {" "}
          <span className="date-value-red">
            {formatDate(timing.end_date)}
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
          <FaDownload/>
          PDF
        </button>
        <Link
          href={`/register?timing_id=${timing.id}&course_slug=${timing.course_slug}`}
          className="btn-register"
          onClick={(e) => e.stopPropagation()}
        >
         تسجيل
        </Link>
        <Link
          href={`/enquire?timing_id=${timing.id}&course_slug=${timing.course_slug}`}
          className="btn-enquire"
          onClick={(e) => e.stopPropagation()}
        >
          استفسار
        </Link>
      </div>
    </div>
  );
}

