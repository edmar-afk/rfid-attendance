import React from "react";
import { NavLink } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import HistoryIcon from "@mui/icons-material/History";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

function Navigation() {
  const baseGreen =
    "group flex h-min items-center justify-center duration-300 rounded-lg font-semibold py-2 px-4 text-sm sm:text-base focus:outline-none";

  return (
    <div className="flex mt-24 justify-start gap-x-6 text-white px-20 mb-8">
      <NavLink
        to="/school-dashboard-statistics-444212345-capstone2026"
        className={({ isActive }) =>
          `${baseGreen} bg-green-500 text-white border-b-4 border-b-green-700
          hover:opacity-95 hover:text-gray-100 active:bg-green-800 active:text-gray-300
          ${isActive ? "shadow-2xl shadow-green-900/50" : "shadow-lg"}`
        }
      >
        <GridViewIcon fontSize="small" className="mr-1" />
        Overview
      </NavLink>

      <NavLink
        to="/history-444212345-capstone2026"
        className={({ isActive }) =>
          `${baseGreen} bg-green-500 text-white border-b-4 border-b-green-700
          hover:opacity-95 hover:text-gray-100 active:bg-green-800 active:text-gray-300
          ${isActive ? "shadow-2xl shadow-green-900/50" : "shadow-lg"}`
        }
      >
        <HistoryIcon fontSize="small" className="mr-1" />
        History Logs
      </NavLink>

      <NavLink
        to="/student-lists-444212345-capstone2026"
        className={({ isActive }) =>
          `${baseGreen} bg-white text-green-800 border border-green-500 border-b-4 border-b-green-400
          hover:bg-gray-50 hover:text-green-900 active:bg-gray-100 active:text-green-600
          ${isActive ? "shadow-2xl shadow-green-700/40" : "shadow"}`
        }
      >
        <PeopleAltIcon fontSize="small" className="mr-1" />
        Student Lists
      </NavLink>
    </div>
  );
}

export default Navigation;
