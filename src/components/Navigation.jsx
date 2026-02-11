import React from "react";
import { NavLink } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import HistoryIcon from "@mui/icons-material/History";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";

function Navigation() {
  const base =
    "group flex items-center justify-center rounded-lg font-semibold py-2 px-4 text-sm sm:text-base transition-all duration-300 ease-in-out";

  const inactive =
    "bg-green-600 text-white border border-green-700 shadow-lg hover:bg-green-700";

  const active =
    "bg-white text-green-700 border-2 border-green-600 scale-95 shadow-2xl";

  const logoutStyle =
    "bg-red-600 text-white border border-red-700 shadow-lg hover:bg-red-700";

  return (
    <div className="flex mt-24 items-center justify-between px-20 mb-8">
      <div className="flex gap-x-4">
        <NavLink
          to="/school-dashboard-statistics-444212345-capstone2026"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <GridViewIcon fontSize="small" className="mr-1" />
          Overview
        </NavLink>

        <NavLink
          to="/history-444212345-capstone2026"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <HistoryIcon fontSize="small" className="mr-1" />
          History Logs
        </NavLink>

        <NavLink
          to="/student-lists-444212345-capstone2026"
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <PeopleAltIcon fontSize="small" className="mr-1" />
          Student Lists
        </NavLink>
      </div>

      <NavLink to="/" className={`${base} ${logoutStyle}`}>
        <LogoutIcon fontSize="small" className="mr-1" />
        Logout
      </NavLink>
    </div>
  );
}

export default Navigation;
