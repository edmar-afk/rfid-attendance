/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../login.module.css";
import logo from "../assets/images/logo.jpg";

export default function Login() {
  const [form, setForm] = useState("login");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const isLogin = form === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (username === "admin" && password === "admin123") {
        navigate("/school-dashboard-statistics-444212345-capstone2026");
      } else {
        alert("Invalid username or password");
      }
    }, 1000);
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
                <label className={styles["form-label"]}>Username</label>
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
