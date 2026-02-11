import React, { useState } from "react";
import { Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function AddStudentModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 cursor-pointer hover:bg-blue-700"
      >
       <AddIcon/> Add Student
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Add Student
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Student Name"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddStudentModal;
