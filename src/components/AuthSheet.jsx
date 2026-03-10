import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "../styles/AuthSheet.css";

const AuthSheet = ({ close, onSuccess }) => {
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* LOGIN */

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      login(
        {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        },
        data.token
      );

      onSuccess();
      close();

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  /* REGISTER */

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);
      alert("Account created. Please login.");
      setActiveTab("signin");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-sheet-overlay">

      <div className="auth-sheet">

        <div className="sheet-header">
          <span></span>
          <button onClick={close}>×</button>
        </div>

        <div className="auth-tabs">
          <span
            className={activeTab === "signin" ? "active" : ""}
            onClick={() => setActiveTab("signin")}
          >
            Sign in
          </span>

          <span
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </span>
        </div>

        {activeTab === "signin" ? (
          <form onSubmit={handleLogin}>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">SIGN IN</button>

          </form>
        ) : (
          <form onSubmit={handleRegister}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button type="submit">REGISTER</button>

          </form>
        )}

      </div>

    </div>
  );
};

export default AuthSheet;