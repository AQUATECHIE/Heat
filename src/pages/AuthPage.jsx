import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/AuthPage.css";
import logo from "../assets/hero-logo.png";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios"; // ✅ IMPORTED

const AuthPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState("signin");
  const [showOTP, setShowOTP] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  /* =======================
     HANDLE INPUT CHANGE
  ======================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =======================
     REGISTER
  ======================== */
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/register", formData);

      setShowOTP(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  /* =======================
     VERIFY OTP
  ======================== */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");

    try {
      await api.post("/auth/verify-otp", {
        email: formData.email,
        otp: otpCode,
      });

      alert("Verification successful!");
      setShowOTP(false);
      setActiveTab("signin");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  /* =======================
     LOGIN
  ======================== */
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

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  /* =======================
     OTP SCREEN
  ======================== */
  if (showOTP) {
    return (
      <div className="auth-container">
        <img src={logo} alt="logo" className="auth-logo" />
        <h2>Enter code</h2>
        <p className="sub-text">Sent to {formData.email}</p>

        <form onSubmit={handleVerifyOTP}>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => {
                  if (!/^[0-9]?$/.test(e.target.value)) return;
                  const newOtp = [...otp];
                  newOtp[index] = e.target.value;
                  setOtp(newOtp);
                  if (e.target.value && index < 5) {
                    inputsRef.current[index + 1].focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && index > 0) {
                    inputsRef.current[index - 1].focus();
                  }
                }}
              />
            ))}
          </div>

          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }

  /* =======================
     AUTH SCREEN
  ======================== */
  return (
    <div className="auth-container">
      <img src={logo} alt="logo" className="auth-logo" />

      <div className="auth-tabs">
        <div
          className={`tab-indicator ${
            activeTab === "register" ? "right" : ""
          }`}
        ></div>

        <span
          className={`tab ${activeTab === "signin" ? "active" : ""}`}
          onClick={() => setActiveTab("signin")}
        >
          Sign in
        </span>

        <span
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </span>
      </div>

      {activeTab === "signin" ? (
        <>
          <h2>Sign in</h2>
          <p className="sub-text">Sign in or create an account</p>

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
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">CONTINUE</button>
          </form>
        </>
      ) : (
        <>
          <h2>Create Account</h2>

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

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">REGISTER</button>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthPage;