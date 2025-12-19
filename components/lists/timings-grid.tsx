import TimingCard from "../cards/timing-card";

interface TimingsGridProps {
  timings: CourseTiming[];
  course: CourseDetail;
}

export default function TimingsGrid({ timings, course }: TimingsGridProps) {
  return (
    <div className="timings-grid">
      {timings.length > 0 ? (
        timings.map((timing) => (
          <TimingCard
            key={timing.id}
            timing={timing}
            courseSlug={course.slug}
            course={{
              id: course.id,
              title: course.title,
              slug: course.slug,
              description: course.description,
              content: course.content,
              image: course.image,
              code: course.code || undefined,
              duration: course.duration,
              category: course.category
                ? {
                    id: course.category.id || 0,
                    title: course.category.title,
                    slug: course.category.slug,
                  }
                : undefined,
            }}
          />
        ))
      ) : (
        <div className="no-timings">
          <p>لا يوجد جلسات متاحة بالوقت المحدد.</p>
        </div>
      )}
    </div>
  );
}
