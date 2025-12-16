export default function SearchCourse({
  searchQuery,
  handleSearchChange,
}: {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="search-area">
      <input
        type="text"
        id="search"
        className="search-area-input pr-0!"
        placeholder="البحث في الدورات التدريبية"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <img src="/icons/search.svg" alt="Search" />
    </div>
  );
}
