import { Metadata } from "next";
import "@/styles/course.css";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import { getCourseDetails } from "@/services/courses/courses-services";
import TimingsSection from "@/components/lists/timings-section";
import CourseSchema from "@/components/schema/course-schema";
import CourseContentStyling from "@/components/ui/course-content-styling";

interface TrainingCoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: TrainingCoursePageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const courseData = await getCourseDetails(resolvedParams.slug || "");
    const course = courseData?.course;
    const baseUrl = "";

    if (!course) {
      return {
        title: "الدورة غير موجودة | مركز الأداء المتوازن للتدريب",
        description: "تعذّر العثور على الدورة المطلوبة.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const metaTitle = course.meta_title || course.title;
    const metaDescription = course.meta_description || course.description || "";
    const metaImage = course.image || "";
    const canonical =
      course.canonical || `${baseUrl}/training-course/${resolvedParams.slug}`;

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: course.keywords,
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: metaImage
          ? [
              {
                url: metaImage,
                width: 1200,
                height: 630,
                alt: course.title,
              },
            ]
          : [],
        type: "website",
        url: canonical,
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: metaImage ? [metaImage] : [],
      },
      alternates: {
        canonical: canonical,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "الدورة غير موجودة | مركز الأداء المتوازن للتدريب",
      description:
        "العثور على دورات التدريب في المدن في دول الخليج والمواقع الدولية.",
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function TrainingCoursePage({
  params,
}: TrainingCoursePageProps) {
  const resolvedParams = await params;
  const { course, timings } = await getCourseDetails(resolvedParams.slug || "");

  const allTimings: CourseTiming[] =
    course.timings && course.timings.length > 0
      ? course.timings
      : (timings || []).map((timing) => ({
          id: timing.id,
          fees: timing.fees,
          start_date: timing.start_date,
          end_date: timing.end_date,
          duration: timing.duration,
          course_id: course.id,
          city_id: timing.city_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          city: timing.city || {
            id: timing.city_id,
            title: "Unknown",
            slug: "",
          },
        }));

  return (
    <>
      <CourseSchema course={course} timings={allTimings} />
      <Breadcrumb
        currentPage={course.title}
        items={[
          { label: "التخصصات", href: "/training-courses" },
          { label: "الدورات", href: "" },
          { label: course.title || "" },
        ]}
      />
      <HeroBanner
        title={course.h1 || ""}
        description={course.description || ""}
        image={course.image || "/imgs/bg-blog.webp"}
        imageAlt={course.image_alt || course.title}
        imageTitle={course.image_title || course.title}
      />

      <section className="container-main">
        <div className="course-details">
          {/* Course Timings */}
          <TimingsSection timings={allTimings} course={course} />

          {/* Course Info */}
          {course.content && (
            <div className="course-content">
              <CourseContentStyling />
              <h1 className="course-title">{course.title}</h1>
              {course.description && (
                <div className="course-description">
                  <p>{course.description}</p>
                </div>
              )}

              {/* Course Content */}
              {course.content && (
                <div dangerouslySetInnerHTML={{ __html: course.content }} />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
