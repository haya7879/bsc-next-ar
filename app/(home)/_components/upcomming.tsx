import UpcommingCard from "@/components/cards/upcomming-card";
import { getUpcomingCourses } from "@/services/upcoming/upcoming-services";

export default async function UpcommingCourses() {
  const courses = await getUpcomingCourses();

  return (
    <section className="upcomming-section my-8!">
      <div className="container-main">
        <div className="section-title">
          <h2>الدورات القادمة</h2>
        </div>
        <div className="upcomming-cards">
          {courses?.map((course) => (
            <UpcommingCard key={course.timing_id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
