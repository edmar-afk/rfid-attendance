import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Swal from "sweetalert2";
import api from "../../assets/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function EditStudentModal({ open, handleClose, student, refresh }) {
  const [form, setForm] = useState({
    student_id: "",
    username: "",
    first_name: "",
    course: "",
    year_level: "",
    department: "",
    parent_contact: "",
    status: "",
  });

  const [idExists, setIdExists] = useState(false);
  const [checking, setChecking] = useState(false);
  const [studentIdError, setStudentIdError] = useState(false);

  useEffect(() => {
    if (student) {
      setForm({
        student_id: student.student_id || "",
        username: student.student_id || "",
        first_name: student.first_name || "",
        course: student.course || "",
        year_level: student.year_level || "",
        department: student.department || "",
        parent_contact: student.parent_contact || "",
        status: student.status || "",
      });
    }
  }, [student]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Enforce max 10 characters for student_id
    if (name === "student_id") {
      if (value.length > 10) {
        setStudentIdError(true);
      } else {
        setStudentIdError(false);
      }
      newValue = value.slice(0, 10);
    }

    setForm((prev) => ({
      ...prev,
      student_id: name === "student_id" ? newValue : prev.student_id,
      username: name === "student_id" ? newValue : prev.username,
      [name]: newValue,
    }));

    // Check for duplicate ID
    if (name === "student_id" && newValue !== student.student_id) {
      try {
        setChecking(true);
        const res = await api.get(`/api/students/check/${newValue}/`);
        setIdExists(res.data.exists);
      } catch (err) {
        setIdExists(false);
        console.log(err);
      } finally {
        setChecking(false);
      }
    } else if (name === "student_id") {
      setIdExists(false);
    }
  };

  const isFormValid =
    form.student_id &&
    form.username &&
    form.first_name &&
    form.course &&
    form.year_level &&
    form.department &&
    form.parent_contact &&
    form.status &&
    !idExists &&
    !checking &&
    !studentIdError;

  const handleSubmit = async () => {
    try {
      await api.put(`/api/students/update/${student.id}/`, form);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Student updated successfully.",
      });
      refresh();
      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Something went wrong.",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Edit Student
        </Typography>

        <TextField
          fullWidth
          label="Student ID"
          name="student_id"
          value={form.student_id}
          onFocus={() =>
            setForm((prev) => ({ ...prev, student_id: "", username: "" }))
          }
          onChange={handleChange}
          error={studentIdError || idExists}
          helperText={
            studentIdError
              ? "Max 10 numbers only"
              : idExists
                ? "This ID already exists"
                : ""
          }
          inputProps={{
            maxLength: 10,
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />

        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          select
          fullWidth
          label="Year Level"
          name="year_level"
          value={form.year_level}
          onChange={handleChange}
          margin="normal"
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </TextField>

        {/* <TextField
          select
          fullWidth
          label="Course"
          name="course"
          value={form.course}
          onChange={handleChange}
          margin="normal"
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          <option value="Computer System & Data Security">
            Computer System & Data Security
          </option>
          <option value="Teaching Common Competencies in HE">
            Teaching Common Competencies in HE
          </option>
          <option value="Technology Research 2">Technology Research 2</option>
          <option value="Teaching Common Competencies in ICT Network Admin & Maintenance">
            Teaching Common Competencies in ICT Network Admin & Maintenance
          </option>
          <option value="Capstone Project 2">Capstone Project 2</option>
          <option value="Computer System Servicing NC II Data Management 2">
            Computer System Servicing NC II Data Management 2
          </option>
        </TextField> */}

        <TextField
          fullWidth
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          margin="normal"
          sx={{ display: "none" }}
        />

        <TextField
          fullWidth
          label="Parent Contact"
          name="parent_contact"
          value={form.parent_contact}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          margin="normal"
          sx={{ display: "none" }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={!isFormValid || studentIdError}
        >
          Update Student
        </Button>
      </Box>
    </Modal>
  );
}

export default EditStudentModal;
