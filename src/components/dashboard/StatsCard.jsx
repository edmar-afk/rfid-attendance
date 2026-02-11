import React, { useEffect, useState } from "react";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmsIcon from "@mui/icons-material/Sms";

function StatsCard() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    // timeZoneName: "short",
  }).format(now);

  const stats = [
    {
      value: "50,000",
      title: "Attendance Records",
      description:
        "RFID scans automatically logged in real time, ensuring accurate and tamper-proof attendance tracking.",
      icon: <FactCheckIcon className="text-white" />,
    },
    {
      value: "5,000",
      title: "Registered Students",
      description:
        "Each student is uniquely identified through RFID, enabling fast and secure attendance validation.",
      icon: <PeopleAltIcon className="text-white" />,
    },
    {
      value: "9,000",
      title: "SMS Alerts Sent",
      description:
        "Automatic SMS notifications sent to guardians and staff for real-time attendance updates.",
      icon: <SmsIcon className="text-white" />,
    },
  ];

  return (
    <div className="bg-red-50 h-fit flex items-start justify-start">
      <div className="w-full bg-gradient-to-br from-blue-200 via-blue-100 to-green-100 p-8 lg:p-16 text-center shadow-sm">
        <div className="inline-block bg-white border border-gray-100 shadow-sm rounded-full px-4 py-1.5 mb-6">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
            {formattedDateTime}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 tracking-tight">
          RFID Attendance Monitoring System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-50 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                {item.value}
              </h3>

              <p className="text-sm font-semibold text-gray-900 mb-3">
                {item.title}
              </p>

              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
