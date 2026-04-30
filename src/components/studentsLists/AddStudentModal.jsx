import React, { useState, useRef, useEffect } from "react";
import { Modal } from "@mui/material";
import api from "../../assets/api";
import idScanImg from "../../assets/images/students/idScan.png";
import warningImg from "../../assets/images/warning.png";
function AddStudentModal() {
  const [open, setOpen] = useState(false);
  const rfidRef = useRef(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    course: "BSIT",
    year_level: "1st Year",
    department: "IT Department",
    parent_contact: "",
    student_picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "student_picture") {
      setFormData({ ...formData, student_picture: files[0] });
    } else if (name === "student_id") {
      if (value.length <= 10) {
        setFormData({ ...formData, student_id: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isRFIDValid = formData.student_id.length === 10;

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      if (rfidRef.current && formData.student_id.length < 10) {
        rfidRef.current.focus();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [open, formData.student_id]);

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("username", formData.student_id);
      data.append("first_name", formData.first_name);

      data.append("student_id", formData.student_id);
      data.append("course", formData.course);
      data.append("year_level", formData.year_level);
      data.append("department", formData.department);
      data.append("parent_contact", formData.parent_contact);

      if (formData.student_picture) {
        data.append("student_picture", formData.student_picture);
      }

      await api.post("/api/students/upload/", data);

      await api.post("/api/histories/", {
        title: formData.first_name,
        indicator: "New Student",
        description:
          "A new student has been added to the system. Their profile page was created to manage RFID credentials and personalized attendance settings.",
      });

      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const checkStudentID = async () => {
      try {
        const res = await api.get(
          `/api/students/check/${formData.student_id}/`,
        );
        setIsDuplicate(res.data.exists);
      } catch (err) {
        console.log(err);
      }
    };

    if (formData.student_id.length === 10) {
      checkStudentID();
    } else {
      setIsDuplicate(false);
    }
  }, [formData.student_id]);

  useEffect(() => {
    if (isDuplicate && rfidRef.current) {
      rfidRef.current.focus();
      rfidRef.current.select();
    }
  }, [isDuplicate]);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        + Add Student
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative border border-gray-200">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-gray-700 mb-5 border-b border-gray-300 pb-2">
              Register Student
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Students must register first so the RFID scanner can identify them
              and grant access to the automatic attendance system.
            </p>

            <div className="space-y-4 relative">
              <Input
                label="Student RFID"
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                inputRef={rfidRef}
                maxLength={10}
              />

              <div className="relative">
                {(!isRFIDValid || isDuplicate) && (
                  <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center rounded">
                    {!isRFIDValid ? (
                      <>
                        <img
                          src={idScanImg}
                          alt="Scan ID"
                          className="w-48 opacity-80"
                        />
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Please scan a valid 10-digit RFID to continue
                        </p>
                      </>
                    ) : (
                      <>
                        <img
                          src={warningImg}
                          alt="Warning"
                          className="w-72 opacity-80"
                        />
                        <p className="text-sm text-red-600 mb-8 text-center font-bold">
                          Student ID already exists
                        </p>
                      </>
                    )}
                  </div>
                )}
                <div
                  className={
                    !isRFIDValid ? "pointer-events-none opacity-40" : ""
                  }
                >
                  <Input
                    label="Full Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-2"
                  />
                  <div className="flex flex-row gap-2">
                    <div className="flex-1 mt-2">
                      <label className="block mb-1 text-gray-700">Course</label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="Computer System & Data Security">Computer System & Data Security</option>
                        <option value="Teaching Common Competencies in HE">Teaching Common Competencies in HE</option>
                        <option value="Technology Research 2">Technology Research 2</option>
                        <option value="Teaching Common Competencies in ICT Network Admin & Maintenance">Teaching Common Competencies in ICT Network Admin & Maintenance</option>
                        <option value="Capstone Project 2">Capstone Project 2</option>
                        <option value="Computer System Servicing NC II Data Management 2">Computer System Servicing NC II Data Management 2</option>
                      </select>
                    </div>

                    <div className="flex-1 mt-2">
                      <label className="block mb-1 text-gray-700">
                        Year Level
                      </label>
                      <select
                        name="year_level"
                        value={formData.year_level}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                  </div>
                  {/* <Input
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="mt-2"
                  /> */}
                  <Input
                    label="Parent Contact"
                    name="parent_contact"
                    value={formData.parent_contact}
                    onChange={handleChange}
                    className="mt-2"
                  />

                  <div className="mt-2">
                    <label className="block text-sm text-gray-600 mb-1">
                      Student Picture
                    </label>
                    <input
                      type="file"
                      name="student_picture"
                      accept="image/*"
                      onChange={handleChange}
                      disabled={!isRFIDValid}
                      className="w-full text-sm border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded shadow-sm"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!isRFIDValid}
                  className={`px-5 py-2 rounded shadow-sm text-white ${
                    isRFIDValid
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function Input({
  label,
  name,
  value,
  type = "text",
  onChange,
  inputRef,
  maxLength,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
      />
    </div>
  );
}
export default AddStudentModal;
