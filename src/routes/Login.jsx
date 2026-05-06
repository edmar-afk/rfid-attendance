import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../login.module.css";
import logo from "../assets/images/logo.jpg";
import ForgotPassword from "../components/ForgotPassword";
import api from "../assets/api";

export default function Login() {
  const [form] = useState("login");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const isLogin = form === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("role", "admin");
        navigate("/school-dashboard-statistics-444212345-capstone2026");
        return;
      }

      const response = await api.get("/api/sekyo/");
      const sekyos = response.data;

      const matchedSekyo = sekyos.find(
        (item) => item.phone_number === username && password === "security123",
      );

      if (matchedSekyo) {
        localStorage.setItem("role", "security");
        localStorage.setItem("sekyo_name", matchedSekyo.name);
        localStorage.setItem("sekyo_number", matchedSekyo.phone_number);

        navigate("/school-dashboard-statistics-444212345-capstone2026");

        return;
      }

      alert("Invalid username or password");
    } catch {
      alert("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles["auth-container"]}>
        <div className={styles["form-header"]}>
          <img src={logo} alt="Logo" className={styles.logo} />

          <h1 className="text-lg font-semibold">
            RFID ATTENDANCE MONITORING SYSTEM
          </h1>

          <p className="text-md text-gray-400">Login First for Security</p>
        </div>

        <div
          className={`${styles["form-slide"]} ${isLogin ? styles.active : ""}`}
        >
          <div className={styles["form-content"]}>
            <form onSubmit={handleSubmit}>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>
                  Username or Mobile Number
                </label>

                <input
                  type="text"
                  className={styles["form-input"]}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>Password</label>

                <input
                  type="password"
                  className={styles["form-input"]}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <ForgotPassword />
              </div>

              <button
                type="submit"
                className={`${styles["form-button"]} bg-green-600`}
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
