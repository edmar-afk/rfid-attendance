import React from "react";
import Search from "../Search";
import Header from "../Header";
import HistoryCard from "./HistoryCard";

function Table({ title, subtitle }) {
  return (
    <div class="w-full bg-gray-100 flex items-center justify-center h-full p-2">
      <div class="container w-full">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <Header title={title} subtitle={subtitle} />
          </div>

          <div class="overflow-x-auto min-h-[400px] max-h-[600px]">
            <HistoryCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
