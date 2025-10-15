import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import api from "./api/axios";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!password.trim() || !confirmPassword.trim()) {
      setMessage("⚠️ Both fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("⚠️ Passwords do not match");
      return;
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPassword.test(password)) {
      setMessage(
        "⚠️ Password must include uppercase, lowercase, number & special character, and be at least 8 characters long."
      );
      return;
    }

    try {
      await api.post("/auth/reset-password", { token, password });

      setMessage("✅ Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("❌ Invalid or expired link. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/vite.svg" alt="App Logo" className="app-logo" />
          <h1 className="logo-text">JupIter</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Reset Password</button>

          {message && (
            <div
              className="message"
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: message.includes("✅") ? "green" : "red",
              }}
            >
              {message}
            </div>
          )}
        </form>

        <div className="divider">
          <div className="line"></div>
          <p>OR</p>
          <div className="line"></div>
        </div>

        <p className="forgot">
          <Link to="/" style={{ color: "#48854f", textDecoration: "none" }}>
            ← Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
