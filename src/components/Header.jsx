import React from "react";

import AddStudentModal from "./studentsLists/AddStudentModal";

function Header({ title, subtitle, studentLists }) {
  return (
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800">{title}</h2>
        <p class="text-gray-500 mt-1">{subtitle}</p>
      </div>

      {studentLists && (
        <div class="mt-4 md:mt-0">
          <AddStudentModal />
        </div>
      )}
    </div>
  );
}

export default Header;
