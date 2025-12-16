import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

interface PaginationData {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export default function Pagination({
  pagination,
  currentPage,
}: {
  pagination: PaginationData;
  currentPage: number;
}) {
  // Generate page numbers to display (max 5 pages)
  const getPageNumbers = () => {
    if (!pagination) return [];
    const totalPages = pagination.last_page;
    const current = pagination.current_page;
    const pages: (number | string)[] = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page area, and last page
      if (current <= 3) {
        // Near the start
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (current >= totalPages - 2) {
        // Near the end
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        for (let i = current - 2; i <= current + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="custom-pagination mb-[40px]!">
      <div className="pagination-info">
        <span>
          عرض {pagination.from} إلى {pagination.to} من {pagination.total} نتائج
        </span>
      </div>

      <div className="pagination-controls">
        {/* Previous Page */}
        {pagination.prev_page_url ? (
          <Link
            href={`/blogs?page=${currentPage - 1}`}
            className="pagination-btn"
          >
            <HiArrowLeft />
            السابق
          </Link>
        ) : (
          <button className="pagination-btn pagination-btn-disabled" disabled>
            <HiArrowLeft />
            السابق
          </button>
        )}

        {/* Page Numbers */}
        <div className="pagination-numbers">
          {pageNumbers.map((pageNum, index) => {
            if (typeof pageNum === "number") {
              const isActive = pageNum === pagination.current_page;
              return isActive ? (
                <span
                  key={index}
                  className="pagination-number pagination-number-active"
                >
                  {pageNum}
                </span>
              ) : (
                <Link
                  key={index}
                  href={`/blogs?page=${pageNum}`}
                  className="pagination-number"
                >
                  {pageNum}
                </Link>
              );
            }
            return null;
          })}
        </div>

        {/* Next Page */}
        {pagination.next_page_url ? (
          <Link
            href={`/blogs?page=${currentPage + 1}`}
            className="pagination-btn"
          >
            التالي
            <HiArrowRight />
          </Link>
        ) : (
          <button className="pagination-btn pagination-btn-disabled" disabled>
            التالي
            <HiArrowRight />
          </button>
        )}
      </div>
    </div>
  );
}
