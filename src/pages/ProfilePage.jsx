import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfilePage.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // ✅ IMPORTED

const ProfilePage = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(user?.phone || "");
  const [passwordEdit, setPasswordEdit] = useState(false);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const { data } = await api.put(
        "/auth/update-profile",
        { phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Update auth context
      login(data.user, token);

      alert("Profile updated successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  if (!user) return <div>Please login</div>;

  return (
    <>
      <div className="profile-page">
        <h2>My Profile</h2>

        <input value={user.name} disabled />
        <input value={user.role || "Designer"} disabled />
        <input value={user.email} disabled />

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />

        <hr />

        <div className="password-section">
          <span>Password</span>

          <div className="password-box">
            <input
              type="password"
              value="********"
              disabled={!passwordEdit}
            />
            <span
              className="edit-text"
              onClick={() => setPasswordEdit(!passwordEdit)}
            >
              Edit
            </span>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          SAVE CHANGES
        </button>

        <button
          className="logout-profile-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          LOGOUT
        </button>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;