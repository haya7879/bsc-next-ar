import Image from "next/image";

export default function SearchCourse({
  searchQuery,
  handleSearchChange,
}: {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="search-area">
      <div className="search-input-wrapper">
        <Image
          src="/icons/search.svg"
          alt="Search"
          className="search-icon"
          width={18}
          height={18}
        />
        <input
          type="text"
          id="search"
          className="search-input-field"
          placeholder="البحث في الدورات التدريبية"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
