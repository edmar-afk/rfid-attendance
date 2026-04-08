import React, { useEffect, useRef, useState } from "react";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Cards from "./Cards";
import api from "../../assets/api";

function Attendance() {
  const [now, setNow] = useState(new Date());
  const [rfid, setRfid] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Waiting for ID to scan...");
  const inputRef = useRef(null);
  const [isTimeIn, setIsTimeIn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();

    const interval = setInterval(() => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBlur = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const processAttendance = async (rfidValue, isTimeIn) => {
    try {
      setStatus("loading");
      setMessage("Checking ID...");

      const studentRes = await api.get(`/api/student-check/${rfidValue}/`);
      const student = studentRes.data;

      const endpoint = isTimeIn
        ? `/api/attendance/time-in/${rfidValue}/`
        : `/api/attendance/time-out/${rfidValue}/`;

      const response = await api.post(endpoint);

      setStatus("success");
      setMessage(response.data.message || "Attendance Recorded");

      const title = `${student.first_name} (${student.student_id})`;
      const indicator = isTimeIn
        ? "Attendance Checked In"
        : "Attendance Checked Out";
      const description = isTimeIn
        ? `${student.first_name} has successfully timed in at ${new Date().toLocaleTimeString()}.`
        : `${student.first_name} has successfully timed out at ${new Date().toLocaleTimeString()}.`;

      await api.post("/api/histories/", {
        title,
        indicator,
        description,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setStatus("invalid");
        setMessage("ID not matched");
      } else if (error.response && error.response.status === 400) {
        setStatus("invalid");
        setMessage(error.response.data.error || "Already recorded");
      } else {
        setStatus("invalid");
        setMessage("Server error");
      }
    }

    setTimeout(() => {
      setRfid("");
      setStatus("idle");
      setMessage("Waiting for ID to scan...");
    }, 2000);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setRfid(value);

    if (value.length === 10) {
      processAttendance(value, isTimeIn); // now reflects the Switch state
    }
  };

  const formattedDateTime = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  const getBgColor = () => {
    if (status === "invalid") return "bg-red-600 text-white";
    if (status === "success") return "bg-green-800 text-white";
    if (status === "loading") return "bg-yellow-500 text-white";
    return "bg-white text-[#262626]";
  };

  return (
    <div>
      <section className="bg-[#10b981] pt-24">
        <main className="flex md:flex-row justify-center flex-col gap-[100px] md:gap-[40px] lg:gap-[100px] mx-auto w-full max-w-[1440px] min-w-[280px] py-8 px-4 lg:px-8">
          <div className="max-w-[550px]">
            <p className="text-md text-white">{formattedDateTime}</p>

            <h2 className="text-[30px] leading-[48px] md:text-[50px] md:leading-[68px] mt-5 mb-16 text-white">
              RFID Attendance Monitoring System
            </h2>

            <div
              className={`relative w-full flex items-center justify-between max-w-[350px] text-xl font-bold rounded-[38px] py-4 px-6 transition-all duration-300 ${getBgColor()}`}
            >
              <input
                ref={inputRef}
                type="text"
                value={rfid}
                onChange={handleChange}
                onBlur={handleBlur}
                className="absolute opacity-0 pointer-events-none"
              />

              <span className="w-full text-center">{message}</span>

              <PermContactCalendarIcon />
            </div>

            <p className="mt-4 text-white">
              Place your ID on the RFID scanner to process your attendance
            </p>
          </div>

          <Cards rfid={rfid} isTimeIn={isTimeIn} setIsTimeIn={setIsTimeIn} />
        </main>
      </section>
    </div>
  );
}

export default Attendance;
