import React from "react";
import Search from "../Search";
import Header from "../Header";
import BadgeIcon from "@mui/icons-material/Badge";
import StatsCard from "./StatsCard";
import Attendance from "../attendance/Attendance";
function Table() {
  return (
    <div class="w-full bg-gray-100 flex items-center justify-center h-full p-2">
      <div class="container w-full">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <Attendance />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
