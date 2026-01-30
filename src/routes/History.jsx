import React from "react";
import Table from "../components/history/Table";
import Navigation from "../components/Navigation";

function History() {
  return (
    <div className="h-full w-full">
      <Navigation />
      <Table
        title="History"
        subtitle="Explore previously recorded student attendance data"
      />
    </div>
  );
}
1;

export default History;
