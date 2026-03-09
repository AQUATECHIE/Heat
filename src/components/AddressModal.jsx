import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await api.post(
        "/address",
        formData,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      refreshAddress();
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
            onChange={handleChange}
          />

          <input
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <input
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            name="state"
            placeholder="State"
            onChange={handleChange}
          />

          <input
            name="postalCode"
            placeholder="Postal code (optional)"
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
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