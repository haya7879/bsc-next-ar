import { Metadata } from "next";
import "@/styles/course.css";
import Breadcrumb from "@/components/ui/breadcrumb";
import HeroBanner from "@/components/ui/hero-banner";
import { getCityCourseDetails } from "@/services/courses/courses-services";
import CityTimingsSection from "@/components/lists/city-timings-section";
import CourseSchema from "@/components/schema/course-schema";

interface PageProps {
  params: Promise<{
    slug: string;
    citySlug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { slug: courseSlug, citySlug } = resolvedParams;
    const courseData = await getCityCourseDetails(courseSlug, citySlug);
    const course = courseData?.course;
    const city = courseData?.city;
    const baseUrl = "";

    if (!course || !city) {
      return {
        title: "الدورة غير موجودة | مركز الأداء المتوازن للتدريب",
        description: "تعذّر العثور على الدورة المطلوبة.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const metaTitle = course.meta_title || `${course.title} in ${city.title}`;
    const metaDescription = course.meta_description || course.description || "";
    const metaImage = course.image || "";
    const canonical = course.canonical || `${baseUrl}/training-course/${courseSlug}/${citySlug}`;

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
        images: metaImage ? [
          {
            url: metaImage,
            width: 1200,
            height: 630,
            alt: course.title,
          },
        ] : [],
        type: 'website',
        url: canonical,
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: metaImage ? [metaImage] : [],
      },
      alternates: {
        canonical: canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "الدورة غير موجودة | مركز الأداء المتوازن للتدريب",
      description: "العثور على دورات التدريب في المدن في دول الخليج والمواقع الدولية.",
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

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug: courseSlug, citySlug } = resolvedParams;
  const courseData = await getCityCourseDetails(courseSlug, citySlug);
  const { course, city, timings } = courseData;

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
            title: city.title,
            slug: city.slug,
          },
        }));

  return (
    <>
      <CourseSchema course={course} timings={allTimings} />
      <Breadcrumb
        currentPage={`${course.title} - ${city.title}`}
        items={[
          { label: "التخصصات", href: "/training-courses" },
          { label: "الدورات", href: "" },
          { label: course.title || "" },
          { label: city.title || "" },
        ]}
      />
      <HeroBanner
        title={course.h1 || `${course.title} in ${city.title}`}
        description={course.description || ""}
        image={course.image || "/imgs/bg-blog.webp"}
        imageAlt={course.image_alt || course.title}
        imageTitle={course.image_title || course.title}
      />

      <section className="container-main">
        <div className="course-details">
          {/* Course Timings */}
          <CityTimingsSection timings={allTimings} course={course} />

          {/* Course Info */}
          {course.content && (
            <div className="course-content mb-[60px]!">
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
