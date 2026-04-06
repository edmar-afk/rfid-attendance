/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import attendanceBg from "../../assets/images/attendance.png";
import wrongIdImg from "../../assets/images/wrong.png";
import Switch from "./Switch";
import api from "../../assets/api";

function Cards({ rfid }) {
  const [student, setStudent] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (!rfid) return;

    const fetchStudent = async () => {
      try {
        const res = await api.get(`/api/student-check/${rfid}/`);
        setStudent(res.data);
        setIsInvalid(false);
      } catch (err) {
        setStudent(null);
        setIsInvalid(true);
      }
    };

    fetchStudent();
  }, [rfid]);

  const hasScanned = rfid && rfid.length > 0;

  const BASE_URL = "http://127.0.0.1:8000";

  const displayImage =
    student && student.student_picture
      ? `${BASE_URL}${student.student_picture}`
      : isInvalid
        ? wrongIdImg
        : attendanceBg;

  console.log("Student Data:", student);

  return (
    <div className="flex md:mt-[-70px] flex-col md:flex-row md:flex-wrap items-center justify-center gap-2">
      <div
        className={`relative rounded-[40px] w-[250px] md:w-[220px] lg:w-[250px] h-[330px] overflow-hidden 
        ${isInvalid ? "border-4 border-red-600 bg-red-50" : "bg-white"}`}
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

      <Switch />

      <div className="bg-green-800 rounded-[40px] w-[250px] md:w-[220px] lg:w-[250px] h-[330px] p-8 md:p-4 lg:p-8 flex flex-col justify-start">
        <NotificationsActiveIcon className="text-white" sx={{ fontSize: 55 }} />
        <div>
          <span className="text-[40px] text-white leading-[93px] font-bold">
            1,123,222.
          </span>
          <p>
            <span className="text-2xl font-bold text-white">
              Phasellus Vitae
            </span>
            <br />
            <span className="text-xl font-semibold text-white">Quisque</span>
            <br />
            <span className="text-lg font-extralight text-white">
              Porttitor vitae vel amet
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] w-[250px] md:w-[220px] lg:w-[250px] h-[330px] p-8 md:p-4 lg:p-8 flex flex-col justify-start">
        <NotificationsActiveIcon
          className="text-gray-800"
          sx={{ fontSize: 55 }}
        />
        <div>
          <span className="text-[40px] text-gray-900 leading-[93px] font-bold">
            1,123,222.
          </span>
          <p>
            <span className="text-2xl font-bold">Phasellus Vitae</span>
            <br />
            <span className="text-xl font-semibold">Quisque</span>
            <br />
            <span className="text-lg font-extralight">
              Porttitor vitae vel amet
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
