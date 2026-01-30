import React from "react";

function Header({title, subtitle}) {
  return (
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800">{title}</h2>
        <p class="text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>
      <div class="mt-4 md:mt-0">
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out">
          Add Member
        </button>
      </div>
    </div>
  );
}

export default Header;
