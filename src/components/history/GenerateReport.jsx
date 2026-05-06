/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from "../../assets/api";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function GenerateReport() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  const [fileType, setFileType] = useState("xlsx");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [officeEmail, setOfficeEmail] = useState("cagapetrisha57@gmail.com");

  const officeEmails = [
    {
      label: "cagapetrisha57@gmail.com",
      value: "cagapetrisha57@gmail.com",
    },
    {
      label: "corazareymark25@gmail.com",
      value: "corazareymark25@gmail.com",
    },
    {
      label: "corazareymark5@gmail.com",
      value: "corazareymark5@gmail.com",
    },
    {
      label: "apasneniajane@gmail com",
      value: "apasneniajane@gmail com",
    },
  ];

  const formatTime = (timeStr) => {
    if (!timeStr) return "";

    const date = new Date(`1970-01-01T${timeStr}`);

    if (isNaN(date.getTime())) return timeStr;

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getFileName = (ext) => {
    const start = startDate || "start";
    const end = endDate || "end";

    return `Attendance_${start}_to_${end}.${ext}`;
  };

  const generateExcel = (rows) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, getFileName("xlsx"));
  };

  const generateCSV = (rows) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = getFileName("csv");

    link.click();
  };

  const generatePDF = (rows) => {
    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text("Attendance Report", 14, 15);

    autoTable(doc, {
      startY: 22,
      head: [["Student ID", "Name", "Date", "Time In", "Time Out"]],
      body: rows.map((item) => [
        item.student_id,
        item.name,
        item.date,
        item.time_in,
        item.time_out,
      ]),
    });

    doc.save(getFileName("pdf"));
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/filter-attendance/", {
        params: {
          date_from: startDate,
          date_to: endDate,
        },
      });

      const rows = res.data.map((item) => ({
        student_id: item.student_id,
        name: `${item.first_name} ${item.last_name}`,
        date: item.date,
        time_in: formatTime(item.time_in),
        time_out: formatTime(item.time_out),
      }));

      if (fileType === "xlsx") generateExcel(rows);

      if (fileType === "csv") generateCSV(rows);

      if (fileType === "pdf") generatePDF(rows);

      setOpen(false);
    } catch (error) {
      console.log(error);

      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReportByMail = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/filter-attendance/", {
        params: {
          date_from: startDate,
          date_to: endDate,
        },
      });

      const rows = res.data.map((item) => ({
        student_id: item.student_id,
        name: `${item.first_name} ${item.last_name}`,
        date: item.date,
        time_in: formatTime(item.time_in),
        time_out: formatTime(item.time_out),
      }));

      let fileBlob;
      let fileName;

      if (fileType === "xlsx") {
        const worksheet = XLSX.utils.json_to_sheet(rows);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

        const buffer = XLSX.write(workbook, {
          type: "array",
          bookType: "xlsx",
        });

        fileBlob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        fileName = getFileName("xlsx");
      }

      if (fileType === "pdf") {
        const doc = new jsPDF();

        doc.text("Attendance Report", 14, 15);

        autoTable(doc, {
          startY: 22,
          head: [["Student ID", "Name", "Date", "Time In", "Time Out"]],
          body: rows.map((item) => [
            item.student_id,
            item.name,
            item.date,
            item.time_in,
            item.time_out,
          ]),
        });

        fileBlob = doc.output("blob");

        fileName = getFileName("pdf");
      }

      if (fileType === "csv") {
        const worksheet = XLSX.utils.json_to_sheet(rows);

        const csv = XLSX.utils.sheet_to_csv(worksheet);

        fileBlob = new Blob([csv], {
          type: "text/csv;charset=utf-8;",
        });

        fileName = getFileName("csv");
      }

      const formData = new FormData();

      formData.append("file", fileBlob, fileName);

      formData.append("email", officeEmail);

      await api.post("/api/send-report-email/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Report submitted to ${officeEmail}`);

      setOpen(false);
    } catch (error) {
      console.log(error);

      alert("Failed to send report");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = fileType && startDate && endDate && officeEmail;

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Report
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 720,
            bgcolor: "white",
            borderRadius: "18px",
            boxShadow: 24,
            overflow: "hidden",
          }}
        >
          <div className="w-full">
            <div className="flex items-center justify-between px-7 py-5 bg-gradient-to-r from-green-600 to-emerald-800 text-white">
              <div>
                <h2 className="text-2xl font-bold">Generate Report</h2>
              </div>

              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon className="text-white" />
              </IconButton>
            </div>

            <div className="p-7 space-y-6 bg-gray-50">
              <div className="bg-white rounded-2xl p-5 border">
                <label className="text-sm font-semibold mb-4 block">
                  Select Date Range
                </label>

                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-xl px-4 py-3"
                  />

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border">
                <label className="text-sm font-semibold mb-2 block">
                  Export Format
                </label>

                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="xlsx">Excel</option>
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                </select>
              </div>

              <div className="bg-white rounded-2xl p-5 border">
                <label className="text-sm font-semibold mb-2 block">
                  Select Email
                </label>

                <select
                  value={officeEmail}
                  onChange={(e) => setOfficeEmail(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3"
                >
                  {officeEmails.map((office) => (
                    <option key={office.value} value={office.value}>
                      {office.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setAction("generate");

                    handleGenerate();
                  }}
                  disabled={loading || !isFormValid}
                  className="px-6 py-3 rounded-xl text-white bg-green-600"
                >
                  {loading && action === "generate"
                    ? "Generating..."
                    : "Generate Report"}
                </button>

                <button
                  onClick={() => {
                    setAction("email");

                    handleSendReportByMail();
                  }}
                  disabled={loading || !isFormValid}
                  className="px-6 py-3 rounded-xl text-white bg-blue-600"
                >
                  {loading && action === "email"
                    ? "Sending..."
                    : "Submit to Office"}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default GenerateReport;
