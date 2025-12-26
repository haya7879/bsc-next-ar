"use client";
import Image from "next/image";
import { useFormatDate } from "@/lib/hooks/use-format-date";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UpcommingCardProps {
  course: UpcomingCourse;
}

export default function UpcommingCard({ course }: UpcommingCardProps) {
  const router = useRouter();
  const startDate = useFormatDate(course.start_date);
  const endDate = useFormatDate(course.end_date);
  const readMoreUrl = `/training-course/${course.course_slug}`;
  const registerUrl = `/register?timing_id=${course.timing_id}&course_slug=${course.course_slug}`;

  return (
    <div
      className="upcomming-card"
      data-href={readMoreUrl}
      onClick={() => router.push(readMoreUrl)}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={course?.course_image || ""}
        alt={course.course_image_alt || course.course_title}
        width={400}
        height={300}
        quality={65}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      <div className="card-content">
        <div className="card-title">{course.course_title}</div>
        <div className="card-dates">
          <img src="/icons/calender2.svg" alt="Calendar" />
          <span>
            من {startDate.day} {startDate.month} إلى {endDate.day}{" "}
            {endDate.month}
          </span>
          &nbsp;-&nbsp;
          <span>{startDate.year}</span>
        </div>
        <div className="card-location">
          <img
            src="/icons/location.svg"
            alt="Location"
            className="location-icon"
          />
          <span>{course.city_title}</span>
        </div>
        <div className="card-buttons">
          <Link
            href={registerUrl}
            className="btn-primary"
            onClick={(e) => e.stopPropagation()}
          >
            سجل الآن
          </Link>
          <Link
            href={readMoreUrl}
            className="btn-secondary"
            aria-label={`Read more about ${course.course_title}`}
            onClick={(e) => e.stopPropagation()}
          >
            اقرأ المزيد{" "}
            <span className="sr-only"> حول {course.course_title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
