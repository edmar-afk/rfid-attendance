import React from "react";

function Search({
  searchTerm,
  setSearchTerm,
  selectedYearLevel,
  setSelectedYearLevel,
}) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
          placeholder="Search students..."
        />
      </div>

      <div>
        <select
          value={selectedYearLevel}
          onChange={(e) => setSelectedYearLevel(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
        >
          <option value="">All Year Level</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </div>
    </div>
  );
}

export default Search;
