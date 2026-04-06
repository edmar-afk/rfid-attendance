import React, { useEffect, useState } from "react";
import attendanceImg from "../../assets/images/students/attendance.png";

function Switch({ onTimeIn, onTimeOut }) {
  const [isTimeIn, setIsTimeIn] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);

      const hour = now.getHours();

      if (hour >= 7 && hour < 12) {
        setIsTimeIn(true);
      } else if (hour === 12) {
        setIsTimeIn(false);
      } else if (hour >= 13) {
        setIsTimeIn(true);
      } else {
        setIsTimeIn(false);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatHour = (hour) => {
    const h = hour % 12;
    return h === 0 ? 12 : h;
  };

  const hours = formatHour(time.getHours()).toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const period = time.getHours() >= 12 ? "PM" : "AM";

  const handleSwitch = () => {
    if (isTimeIn) {
      onTimeOut && onTimeOut();
    } else {
      onTimeIn && onTimeIn();
    }
    setIsTimeIn(!isTimeIn);
  };

  return (
    <div
      className={`${
        isTimeIn ? "bg-green-600" : "bg-red-600"
      } rounded-[40px] w-[250px] md:w-[220px] lg:w-[250px] h-[330px] p-6 flex flex-col justify-between shadow-xl transition-all duration-300`}
    >
      <div className="flex justify-center">
        <img src={attendanceImg} className="w-28 h-28" />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          {isTimeIn ? "Time In" : "Time Out"}
        </h2>

        <div className="mt-4">
          <p className="text-white/70 text-xs uppercase tracking-wider">
            Current Time
          </p>

          <div className="flex justify-center items-end gap-1">
            <span className="text-3xl font-semibold text-white">
              {hours}:{minutes}
            </span>
            <span className="text-lg font-bold text-white animate-pulse">
              :{seconds}
            </span>
            <span className="text-sm font-semibold text-white ml-1">
              {period}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSwitch}
        className={`${
          isTimeIn
            ? "bg-white text-green-600 hover:bg-green-100"
            : "bg-white text-red-600 hover:bg-red-100"
        } font-bold py-2 rounded-full transition-all cursor-pointer`}
      >
        {isTimeIn ? "Switch to Time Out" : "Switch to Time In"}
      </button>
    </div>
  );
}

export default Switch;
