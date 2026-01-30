import React from "react";
import Search from "../Search";
import Header from "../Header";
import BadgeIcon from "@mui/icons-material/Badge";
function Table({ title, subtitle }) {
  return (
    <div class="w-full bg-gray-100 flex items-center justify-center h-full p-2">
      <div class="container w-full">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <Header title={title} subtitle={subtitle} />

            <Search />
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Parent/Guardian
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Year Lvl - Department
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-row items-center">
                      <div class="h-10 w-10 flex items-center border-1 rounded-full border-green-300 bg-green-100">
                        <BadgeIcon className="mx-auto text-green-600" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-bold text-gray-900">
                          Sample Name
                        </div>
                        <div class="text-sm text-gray-500">09123456789</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 flex flex-col">
                      <p className="font-bold">Sample Name</p>
                      <p className="text-gray-500 text-xs">Grandfather</p>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">4th Year - BSIT </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </a>
                    <a href="#" class="text-red-600 hover:text-red-900">
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between flex-col sm:flex-row">
              <div class="mb-4 sm:mb-0">
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium ml-1">1</span> results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;

