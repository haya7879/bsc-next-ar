import UpcommingCard from "@/components/cards/upcomming-card";
import { getUpcomingCourses } from "@/services/upcoming/upcoming-services";

export default async function UpcommingCourses() {
  const courses = await getUpcomingCourses();

  return (
    <section className="search-courses home-courses">
      <div className="container-main">
        <h2>الدورات القادمة</h2>
        <div className="card-container">
          {courses?.map((course) => (
            <UpcommingCard key={course.timing_id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
