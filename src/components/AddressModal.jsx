import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/CheckoutPage.css";

const AddressModal = ({ close, refreshAddress }) => {

  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  /* =========================
     LOAD EXISTING ADDRESS
  ========================= */

  const fetchAddress = async () => {
    try {

      const { data } = await api.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data) return;

      setFormData({
        country: data.country || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        address: data.address || "",
        apartment: data.apartment || "",
        city: data.city || "",
        state: data.state || "",
        postalCode: data.postalCode || "",
        phone: data.phone || "",
      });

    } catch (error) {
      console.log("No saved address yet");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* =========================
     SAVE / UPDATE ADDRESS
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.put(
        "/address",
        formData,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      // refresh checkout page instantly
      refreshAddress();

      // close modal
      close();

    } catch(error){
      console.error("Address save failed");
    }
  };

  return (
    <div className="address-overlay">

      <div className="address-modal">

        <div className="address-header">
          <h3>Delivery Address</h3>
          <div className="close-btn" onClick={close}>✕</div>
        </div>

        <form className="address-form" onSubmit={handleSubmit}>

          <input
            name="country"
            placeholder="Country or region"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={formData.apartment}
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />

          <input
            name="postalCode"
            placeholder="Postal code (optional)"
            value={formData.postalCode}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <button className="update-address-btn">
            UPDATE ADDRESS
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddressModal;