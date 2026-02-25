import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ProfilePage.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(user?.phone || "");
  const [passwordEdit, setPasswordEdit] = useState(false);

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      // Update auth context
      login(data.user, localStorage.getItem("token"));

      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
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
            <input type="password" value="********" disabled={!passwordEdit} />
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
