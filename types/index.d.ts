interface City {
  id?: number;
  slug: string;
  title: string;
  description?: string;
  additional_description?: string;
  h1?: string;
  image?: string;
  image_alt?: string;
  image_title?: string;
  canonical?: string | null;
  meta_title?: string;
  meta_description?: string;
  description2?: string; // Alias for additional_description
  created_at?: string;
  updated_at?: string;
}
interface Category {
  id?: number;
  slug: string;
  title: string;
  description?: string;
  additional_description?: string;
  h1?: string;
  image?: string;
  icon?: string | null;
  image_alt?: string;
  image_title?: string;
  canonical?: string | null;
  meta_title?: string;
  meta_description?: string;
  description2?: string; // Alias for additional_description
  created_at?: string;
  updated_at?: string;
}
interface Course {
  id?: number;
  slug: string;
  title: string;
  code?: string | null;
  duration?: number;
}

interface UpcomingCourse {
  timing_id: number;
  start_date: string;
  end_date: string;
  city_title: string;
  city_slug: string;
  course_title: string;
  course_slug: string;
  course_image: string;
  course_image_alt: string;
  course_image_title: string;
}

interface CourseTiming {
  id: number;
  fees: string;
  start_date: string;
  end_date: string;
  duration: number;
  course_id: number;
  city_id: number;
  created_at: string;
  updated_at: string;
  city: {
    id: number;
    title: string;
    slug: string;
  };
}

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  h1: string;
  keywords: string | null;
  duration: number;
  image: string;
  image_title: string | null;
  image_alt: string | null;
  code: string | null;
  category_id: number;
  canonical: string | null;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  category: Category;
  timings: CourseTiming[];
}

interface CourseDetailResponse {
  status: string;
  course: CourseDetail;
  timings: Array<{
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
  }>;
}

interface CityCourseResponse {
  status: string;
  course: CourseDetail;
  city: {
    id: number;
    title: string;
    slug: string;
  };
  timings: Array<{
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
  }>;
}

interface SearchTiming {
  id: number;
  start_date: string;
  end_date: string;
  fees: string;
  duration: number;
  course_title: string;
  course_slug: string;
  category_id: number;
  category_title: string;
  category_slug: string;
  city_title: string;
  city_slug: string;
}

interface SearchCourse {
  id: number;
  title: string;
  slug: string;
  code: string | null;
  duration: number;
  category: {
    id: number;
    title: string;
    slug: string;
  } | null;
}

interface SearchFilters {
  keyword?: string;
  category_slug?: string;
  duration?: string;
  city_slug?: string;
  month?: string;
}

interface SearchResponse {
  status: string;
  type: "timings" | "courses";
  count: number;
  filters: SearchFilters;
  data: SearchTiming[] | SearchCourse[];
}

interface CourseWithTimings {
  id: number;
  title: string;
  slug: string;
  code: string | null;
  duration: number;
  timings: Array<{
    id: number;
    fees: string;
    start_date: string;
    end_date: string;
    duration: number;
    course_id: number;
    city_id: number;
    created_at: string;
    updated_at: string;
  }>;
}

interface CategoryCityResponse {
  status: string;
  city: {
    id: number;
    title: string;
    slug: string;
  };
  category: {
    id: number;
    title: string;
    slug: string;
  };
  courses: CourseWithTimings[];
  seo: {
    id: number;
    h1: string;
    description: string;
    additional_description: string;
    category_id: number;
    city_id: number;
    canonical: string | null;
    meta_title: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
  };
}

interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  image_alt: string | null;
  image_title: string | null;
  description?: string | null;
  created_at: string;
}

interface BlogPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

interface BlogsResponse {
  status: string;
  blogs: {
    current_page: number;
    data: Blog[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: BlogPaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

interface BlogDetail {
  id: number;
  title: string;
  description: string | null;
  content: string;
  slug: string;
  h1: string;
  image: string | null;
  image_title: string | null;
  image_alt: string | null;
  canonical: string | null;
  meta_description: string;
  meta_title: string;
  created_at: string;
  updated_at: string;
}

interface BlogDetailResponse {
  status: string;
  blog: BlogDetail;
}