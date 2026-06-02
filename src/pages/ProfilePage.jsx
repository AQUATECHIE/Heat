import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Footer from "../components/Footer";
import api from "../api/axios";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { user, login, logout } = useAuth();

  const navigate = useNavigate();

  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await api.get("/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAddress(data);
      } catch (error) {
        console.log("No saved address");
      }
    };

    fetchAddress();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.put(
        "/auth/update-profile",
        { phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      login(
        {
          ...user,
          phone: data.user.phone,
        },
        token,
      );

      alert("Profile updated");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="profile-page">
        <div className="profile-wrapper">
          

          {/* USER CARD */}

          <div className="profile-card">
            <div className="card-head">
              <h3>{user.name}</h3>

              <FiEdit2 className="edit-icon" />
            </div>

            <div className="profile-grid">
              <div>
                <span>Email</span>

                <p>{user.email}</p>
              </div>

              <div>
                <span>Phone Number</span>

                {(address?.phone || phone) && <p>{address?.phone || phone}</p>}
              </div>
            </div>
          </div>

          {/* ADDRESS CARD */}

          <div className="profile-card address-card">
            <div className="card-head">
              <h3>Address</h3>

              <FiEdit2 className="edit-icon" />
            </div>

            <div className="address-info">
              <span>Default Address</span>

              {address?.address && <p>{address.address}</p>}

              {address?.apartment && <p>{address.apartment}</p>}

              {(address?.city || address?.state) && (
                <p>
                  {address?.city} {address?.state}
                </p>
              )}

              {address?.country && <p>{address.country}</p>}

              {address?.postalCode && <p>{address.postalCode}</p>}

              {(address?.phone || phone) && <p>{address?.phone || phone}</p>}
            </div>
          </div>

          {/* ACTIONS */}

          <div className="profile-actions">
            {/* <button className="save-btn" onClick={handleSave}>
              Save
            </button> */}

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
