import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../images/logo.png";
import { AUTH_URL } from "../api/config";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        alert(`Login failed: ${responseText}`);
        return;
      }

      const data = JSON.parse(responseText);

      if (data.code) {
        console.log("🔐 Admin 2FA code:", data.code); // visible in browser console
      }

      if (data.step === "2fa") {
        navigate("/verify", { state: { email } });
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        navigate("/movies1");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        alert("Couldn't connect to the backend. Is it running and using HTTPS?");
      } else {
        alert(`Unexpected error: ${err}`);
      }
    }
  };

  return (
    <div className="login-background dark-mode neon">
      <div className="login-box refined-shadow neon-box">
        <img src={logo} alt="CineNiche Logo" className="login-logo neon-glow" />
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="login-input glow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="login-input glow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="show-password refined-row">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>
          <button type="submit" className="login-button neon-red">
            Log In
          </button>
        </form>
        <p className="login-footer">
          New to CineNiche?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up now
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
