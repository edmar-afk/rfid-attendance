import React from "react";
import Table from "../components/studentsLists/Table";
import Navigation from "../components/Navigation";

function StudentLists() {
  return (
    <div className="h-full w-full">
      <Navigation />
      <Table
        title="Student Lists"
        subtitle="Your guide to viewing and managing all registered students"
      />
    </div>
  );
}

export default StudentLists;
