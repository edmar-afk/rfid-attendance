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

  const [fileType, setFileType] = useState("xlsx");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // FORMAT TIME → 12-HOUR AM/PM
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

  // FILE NAME
  const getFileName = (ext) => {
    const start = startDate || "start";
    const end = endDate || "end";
    return `Attendance_${start}_to_${end}.${ext}`;
  };

  // EXCEL
  const generateExcel = (rows) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, getFileName("xlsx"));
  };

  // CSV
  const generateCSV = (rows) => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = getFileName("csv");
    link.click();
  };

  // PDF
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

  // GENERATE REPORT
  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/filter-attendance/", {
        params: {
          date_from: startDate,
          date_to: endDate,
        },
      });

      const data = res.data;

      const rows = data.map((item) => ({
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

  const isFormValid = fileType && startDate && endDate;

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
            {/* HEADER */}
            <div className="flex items-center justify-between px-7 py-5 bg-gradient-to-r from-green-600 to-emerald-800 text-white">
              <div>
                <h2 className="text-2xl font-bold">Generate Report</h2>
                <p className="text-sm text-green-100">
                  Export Attendance records in seconds
                </p>
              </div>

              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon className="text-white" />
              </IconButton>
            </div>

            {/* BODY */}
            <div className="p-7 space-y-6 bg-gray-50">
              {/* DATE RANGE */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-300">
                <label className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <CalendarMonthIcon fontSize="small" />
                  Select Date Range
                </label>

                <div className="grid grid-cols-2 gap-5">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3"
                  />

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              {/* EXPORT FORMAT */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-300">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <InsertDriveFileIcon fontSize="small" />
                  Export Format
                </label>

                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                >
                  <option value="xlsx">Excel (.xlsx)</option>
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="csv">CSV (.csv)</option>
                </select>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 rounded-xl bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !isFormValid}
                  className={`px-6 py-3 rounded-xl text-white ${
                    loading || !isFormValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600"
                  }`}
                >
                  {loading ? "Generating..." : "Generate Report"}
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
