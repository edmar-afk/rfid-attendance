import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AllInboxIcon from "@mui/icons-material/AllInbox";

const colorMap = {
  "New Student": "bg-green-500",
  "Deleted Student Data": "bg-red-500",
  "Attendance Checked In": "bg-blue-500",
  "Attendance Checked Out": "bg-green-500",
};

const filterMap = {
  "Time In": "Attendance Checked In",
  "Time Out": "Attendance Checked Out",
  Added: "New Student",
  Deletions: "Deleted Student Data",
};

const iconMap = {
  All: <AllInboxIcon />,
  "Time In": <LoginIcon />,
  "Time Out": <LogoutIcon />,
  Added: <AddIcon />,
  Deletions: <DeleteIcon />,
};

function HistoryCard() {
  const [histories, setHistories] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchHistories = async () => {
    try {
      const res = await api.get("/api/histories/");
      setHistories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    let formattedTime = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    formattedTime = formattedTime.replace("AM", "am").replace("PM", "pm");
    return `${formattedDate} - ${formattedTime}`;
  };

  const filteredHistories =
    filter === "All"
      ? histories
      : histories.filter((h) => h.indicator === filterMap[filter]);

  const tags = ["All", "Time In", "Time Out", "Added", "Deletions"];

  return (
    <div className="bg-white h-full relative">
      <div className="sticky top-0 left-0 py-4 ml-8 bg-white z-50">
        <div className="flex w-full md:max-w-3xl mx-4 rounded shadow">
          {tags.map((tag, idx) => (
            <p
              key={idx}
              onClick={() => setFilter(tag)}
              className={`flex-1 flex justify-center items-center gap-2 font-medium px-5 py-2 border cursor-pointer ${
                filter === tag
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-gray-100"
              } ${idx === 0 ? "rounded-l" : ""} ${
                idx === tags.length - 1 ? "rounded-r" : ""
              }`}
            >
              {tag} {iconMap[tag]}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full p-8">
        <div className="flow-root">
          <ul className="-mb-8">
            {filteredHistories.map((item, index) => (
              <li key={index}>
                <div className="relative pb-8 h-28">
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"></span>

                  <div className="relative flex items-start space-x-3">
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-green-500 rounded-full ring-8 ring-white flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-md text-gray-500">
                        <div>
                          <span className="font-medium text-gray-900 mr-2">
                            {item.title}
                          </span>

                          <span className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                            <span className="absolute flex-shrink-0 flex items-center justify-center">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  colorMap[item.indicator] || "bg-gray-400"
                                }`}
                              ></span>
                            </span>

                            <span className="ml-3.5 font-medium text-gray-900">
                              {item.indicator}
                            </span>
                          </span>
                        </div>

                        <span className="whitespace-nowrap text-sm">
                          {formatDate(item.date)}
                        </span>
                      </div>

                      <div className="mt-2 text-gray-700">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `- ${item.description}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
