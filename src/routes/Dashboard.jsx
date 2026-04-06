import React from "react";
import Table from "../components/dashboard/Table";
import Navigation from "../components/Navigation";
import StatsCard from "../components/dashboard/StatsCard";
import Attendance from "../components/attendance/Attendance";

function Dashboard() {
  return (
    <div className="h-full w-full">
      <Navigation />
      <Table />
    </div>
  );
}

export default Dashboard;
