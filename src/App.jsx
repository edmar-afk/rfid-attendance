import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import History from "./routes/History";
import StudentLists from "./routes/StudentLists";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/school-dashboard-statistics-444212345-capstone2026" element={<Dashboard />} />
        <Route path="/history-444212345-capstone2026" element={<History />} />
        <Route path="/student-lists-444212345-capstone2026" element={<StudentLists />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
