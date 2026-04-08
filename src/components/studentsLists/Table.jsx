import React, { useEffect, useState } from "react";
import Search from "../Search";
import Header from "../Header";
import BadgeIcon from "@mui/icons-material/Badge";
import api from "../../assets/api";
import Swal from "sweetalert2";
import EditStudentModal from "./EditStudentModal";
const BASE_URL = import.meta.env.VITE_API_URL;

function Table({ title, subtitle }) {
  const [students, setStudents] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesName =
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = selectedCourse
      ? student.course === selectedCourse
      : true;

    return matchesName && matchesCourse;
  });
  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedStudent(null);
  };

  const fetchStudents = async () => {
    try {
      const res = await api.get("/api/students/");
      const sortedStudents = res.data.slice().sort((a, b) => b.id - a.id);
      setStudents(sortedStudents);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (student_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const student = students.find((s) => s.student_id === student_id);

        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await api.delete(`/api/students/delete/${student_id}/`);

        await api.post("/api/histories/", {
          title: student.first_name,
          indicator: "Deleted Student Data",
          description:
            "A student has been removed from the system. Their RFID credentials and profile data have been deleted.",
        });

        setStudents((prev) => prev.filter((s) => s.student_id !== student_id));

        Swal.fire({
          title: "Deleted!",
          text: "Student has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);

        Swal.fire({
          title: "Error!",
          text: "Failed to delete student.",
          icon: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center h-full p-2">
      <div className="container w-full">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <Header title={title} subtitle={subtitle} studentLists={true} />
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Parent/Guardian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Year Lvl - Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr
                    key={student.student_id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row items-center">
                        <div className="h-10 w-10 overflow-hidden flex items-center justify-center rounded-full border border-green-300 bg-green-100">
                          {student.student_picture ? (
                            <img
                              src={`${BASE_URL}${student.student_picture}`}
                              alt="student"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <BadgeIcon className="text-green-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {student.first_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {student.student_id}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex flex-col">
                        <p className="font-bold">{student.parent_contact}</p>
                        <p className="text-gray-500 text-xs">Parent Contact</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.year_level} - {student.course}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {student.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenEdit(student)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student.student_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium ml-1">{students.length}</span>{" "}
              results
            </p>
          </div>
        </div>
      </div>

      <EditStudentModal
        open={openEdit}
        handleClose={handleCloseEdit}
        student={selectedStudent}
        refresh={fetchStudents}
      />
    </div>
  );
}

export default Table;
