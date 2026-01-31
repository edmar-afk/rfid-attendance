import React from "react";

const timelineData = [
  {
    version: "Sample Student Name",
    type: "New Student",
    typeColor: "green",
    time: "Jan. 31, 2026",
    description: [
      "A new student has been added to the system. Their profile page was created to manage RFID credentials and personalized attendance settings.",
    ],
  },
  {
    version: "Sample Student Name",
    type: "Deleted Student",
    typeColor: "red",
    time: "Jan. 31, 2026",
    description: [
      "A student has been removed from the system. Their RFID credentials and profile data have been deleted.",
    ],
  },
  {
    version: "Sample Student Name",
    type: "Attendance Checked",
    typeColor: "blue",
    time: "Jan. 31, 2026",
    description: [
      "A student's attendance has been checked and recorded in the system <b class='text-blue-600 underline'>10h ago</b>. Parents/Guardian will be notified of the attendance status via SMS.",
    ],
  },
];

function HistoryCard() {
  return (
    <div className="bg-white h-full">
      <div className="w-full p-8">
        <div className="flow-root">
          <ul className="-mb-8">
            {timelineData.map((item, index) => (
              <li key={index}>
                <div className="relative pb-8 h-28">
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
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
                          <a
                            href="#"
                            className="font-medium text-gray-900 mr-2"
                          >
                            {item.version}
                          </a>

                          <a
                            href="#"
                            className="my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                          >
                            <div className="absolute flex-shrink-0 flex items-center justify-center">
                              <span
                                className={`h-1.5 w-1.5 rounded-full bg-${item.typeColor}-500`}
                                aria-hidden="true"
                              ></span>
                            </div>
                            <div className="ml-3.5 font-medium text-gray-900">
                              {item.type}
                            </div>
                          </a>
                        </div>
                        <span className="whitespace-nowrap text-sm">
                          {item.time}
                        </span>
                      </div>
                      <div className="mt-2 text-gray-700">
                        <p>
                          {item.description.map((desc, i) => (
                            <span key={i}>
                              -{" "}
                              <span
                                dangerouslySetInnerHTML={{ __html: desc }}
                              />
                              <br />
                            </span>
                          ))}
                        </p>
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
