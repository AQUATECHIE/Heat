import { useState, useEffect } from "react";
import "../styles/DeliveryAddress.css";
import Footer from "../components/Footer";
import api from "../api/axios";

const DeliveryAddress = () => {
  const [form, setForm] = useState({
    country: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  const token = localStorage.getItem("token");

  // 🔹 Load saved address
  const fetchAddress = async () => {
    try {
      const { data } = await api.get("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data) {
        setForm({
          country: data.country || "",
          address: data.address || "",
          apartment: data.apartment || "",
          city: data.city || "",
          state: data.state || "",
          postalCode: data.postalCode || "",
          phone: data.phone || "",
        });
      }
    } catch (error) {
      console.log("No saved address");
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Save or update address
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api.put("/address", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Address saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save address");
    }
  };

  return (
    <>
      <div className="delivery-page">
        <h2>Delivery Address</h2>

        <form className="delivery-form" onSubmit={handleSave}>
          <input
            type="text"
            name="country"
            placeholder="Country or region"
            value={form.country}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="apartment"
            placeholder="Apartment, suite, etc. (optional)"
            value={form.apartment}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
          />

          <input
            type="text"
            name="postalCode"
            placeholder="Postal code (optional)"
            value={form.postalCode}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <button type="submit">SAVE CHANGES</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default DeliveryAddress;