/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import attendanceBg from "../../assets/images/attendance.png";
import wrongIdImg from "../../assets/images/wrong.png";
import Switch from "./Switch";
import api from "../../assets/api";

function Cards({ rfid, isTimeIn, setIsTimeIn }) {
  const [student, setStudent] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState({
    time_in_count: 0,
    time_out_count: 0,
  });
  const [totalStudents, setTotalStudents] = useState(0);

  const BASE_URL = "http://127.0.0.1:8000";
  const hasScanned = rfid && rfid.length > 0;

  // -----------------------------
  // Initial fetch for counts & total students
  // -----------------------------
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [attendanceRes, studentsRes] = await Promise.all([
          api.get(`/api/attendance/count/`),
          api.get(`/api/students/count/`), // your new endpoint
        ]);

        setAttendanceCount({
          time_in_count: attendanceRes.data.time_in_count,
          time_out_count: attendanceRes.data.time_out_count,
        });

        setTotalStudents(studentsRes.data.total_students);
      } catch (err) {
        console.error("Failed to fetch initial data", err);
      }
    };
    fetchInitialData();
  }, []);

  // ----------------------------------------
  // Refresh counts only when a valid student
  // ----------------------------------------
  useEffect(() => {
    if (!rfid) return;

    const fetchStudentAndRefreshCounts = async () => {
      try {
        const res = await api.get(`/api/student-check/${rfid}/`);
        setStudent(res.data);
        setIsInvalid(false);

        const [countRes, studentsRes] = await Promise.all([
          api.get(`/api/attendance/count/`),
          api.get(`/api/students/count/`),
        ]);

        setAttendanceCount({
          time_in_count: countRes.data.time_in_count,
          time_out_count: countRes.data.time_out_count,
        });

        setTotalStudents(studentsRes.data.total_students);
      } catch (err) {
        setStudent(null);
        setIsInvalid(true);
      }
    };

    fetchStudentAndRefreshCounts();
  }, [rfid]);

  const displayImage =
    student && student.student_picture
      ? `${BASE_URL}${student.student_picture}`
      : isInvalid
        ? wrongIdImg
        : attendanceBg;

  return (
    <div className="flex md:mt-[-70px] flex-col md:flex-row md:flex-wrap items-center justify-center gap-2">
      <div
        className={`relative rounded-[40px] w-[250px] md:w-[220px] lg:w-[250px] h-[330px] overflow-hidden ${
          isInvalid ? "border-4 border-red-600 bg-red-50" : "bg-white"
        }`}
      >
        <img
          src={displayImage}
          alt="Student"
          className="w-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover rounded-[40px]"
        />
        {student && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10 flex flex-col justify-end items-start p-6 text-white">
            <div>
              <span className="text-xl font-bold">Detected!</span>
              <br />
              <span className="text-md font-semibold">
                {student.first_name}
              </span>
              <br />
              <span className="text-sm font-extralight">
                {student.course} - {student.year_level}
              </span>
              <p className="text-xs text-green-400 font-extralight mt-1">
                SMS Notification has been sent successfully!
              </p>
            </div>
          </div>
        )}
        {hasScanned && isInvalid && (
          <div className="absolute inset-0 bg-gradient-to-t from-red-700/0 via-red-600/0 to-transparent z-10 flex items-end p-6">
            <span className="text-red-600 text-xl font-bold">Invalid ID</span>
          </div>
        )}
      </div>

      <Switch
        isTimeIn={isTimeIn}
        onTimeIn={() => setIsTimeIn(true)}
        onTimeOut={() => setIsTimeIn(false)}
      />

      <div className="bg-green-800 rounded-[20px] mt-2 w-[250px] md:w-[220px] lg:w-[250px] h-[135px] p-8 md:p-4 lg:p-8 flex flex-col justify-start">
        <div className="flex flex-row items-start w-full justify-between">
          <div>
            <span className="text-5xl text-white font-bold">
              {attendanceCount.time_in_count}{" "}
              <span className="text-xs">/ {totalStudents} </span>
              <span className="text-sm font-normal">Students</span>
            </span>
            <p className="text-sm text-gray-300 font-bold mt-2">
              Timed-In today
            </p>
          </div>
          <NotificationsActiveIcon
            className="text-white animate-pulse"
            sx={{ fontSize: 45 }}
          />
        </div>
      </div>

      <div className="bg-white rounded-[20px] mt-2 w-[250px] md:w-[220px] lg:w-[250px] h-[135px] p-8 md:p-4 lg:p-8 flex flex-col justify-start">
        <div className="flex flex-row items-start w-full justify-between">
          <div>
            <span className="text-4xl text-gray-900 font-bold">
              {attendanceCount.time_out_count}{" "}
              <span className="text-xs">/ {totalStudents} </span>
              <span className="text-sm font-normal">Students</span>
            </span>
            <p className="text-sm text-gray-500 font-bold mt-2">
              Timed-Out today
            </p>
          </div>
          <NotificationsActiveIcon
            className="text-gray-800 animate-pulse"
            sx={{ fontSize: 45 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
