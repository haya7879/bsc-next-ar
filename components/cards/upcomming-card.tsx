"use client";
import { useFormatDate } from "@/lib/hooks/use-format-date";
import { useRouter } from "next/navigation";

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
      className="card clickable-card"
      data-href={readMoreUrl}
      onClick={() => router.push(readMoreUrl)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={course.course_image}
        alt={course.course_image_alt || course.course_title}
        loading="lazy"
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
          <a href={registerUrl} className="btn-primary">
            سجل الآن
          </a>
          <a href={readMoreUrl} className="btn-secondary">
            اقرأ المزيد
          </a>
        </div>
      </div>
    </div>
  );
}
