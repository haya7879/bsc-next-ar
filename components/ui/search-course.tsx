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
        <img src="/icons/search.svg" alt="Search" className="search-icon" />
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
