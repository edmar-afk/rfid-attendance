import React from "react";
import Table from "../components/dashboard/Table";
import Navigation from "../components/Navigation";

function Dashboard() {
  return (
    <div className="h-full w-full">
      <Navigation />
      <Table
        title="Dashboard"
        subtitle="Your starting point for monitoring student attendance in real time"
      />
    </div>
  );
}

export default Dashboard;
