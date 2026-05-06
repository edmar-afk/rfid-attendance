import React from "react";
import adminImg from "../../assets/images/admin.png";

function AdminOnly() {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-6">
      <div className="overflow-hidden max-w-3xl w-full flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <img
            src={adminImg}
            className="w-72 md:w-80 object-contain"
            alt="Admin"
          />
        </div>

        <div className="flex-1 p-8 flex flex-col justify-center text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wide bg-red-100 text-red-600 rounded-full">
              Restricted Access
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Admin Only Area
          </h1>

          <p className="text-gray-600 text-sm md:text-base mb-6">
            You do not have permission to view this page. This section is
            restricted to administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminOnly;
