import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi2";

interface CoursesListProps {
  courses: Course[];
  pathPrefix?: string;
}

export default function CoursesList({
  courses,
  pathPrefix = "/training-course",
}: CoursesListProps) {
  return (
    <>
      <div>
        {courses.length > 0 && (
          <div className="courses-items" id="courses-container">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`${pathPrefix}/${course.slug}`}
                className="course-item"
                data-title={course.title.toLowerCase()}
              >
                <p>{course.title}</p>
                <span>
                  <HiChevronLeft color="#afafaf" fontSize={16} />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
