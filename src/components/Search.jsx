import React from "react";

function Search() {
  return (
    <div class="mt-6 flex flex-col sm:flex-row gap-4">
      <div class="relative flex-grow">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full "
          placeholder="Search members..."
        />
      </div>
      <div>
        <select class="border border-gray-300 rounded-lg px-4 py-2  w-full sm:w-auto">
          <option value="">All Departments</option>
          <option value="engineering">SET</option>
          <option value="design">STE</option>
          <option value="marketing">SAFES</option>
        </select>
      </div>
    </div>
  );
}

export default Search;
