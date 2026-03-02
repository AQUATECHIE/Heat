import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminCreateProduct.css";

const AdminCreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "shoes",
    brand: "",
    stock: "",
    specifications: "",
  });

  const [images, setImages] = useState([]);
  const [successModal, setSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Admin not authenticated");
        return;
      }

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessModal(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleCloseModal = () => {
    setSuccessModal(false);
    navigate("/admin/products");
  };

  return (
    <div className="admin-create">
      <div className="create-card">
        <h2>Create Product</h2>

        <form onSubmit={handleSubmit} className="create-form">
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="description" placeholder="Description" onChange={handleChange} required />
          <input name="price" placeholder="Price" onChange={handleChange} required />
          <input name="brand" placeholder="Brand" onChange={handleChange} required />
          <input name="stock" placeholder="Stock" onChange={handleChange} required />

          <select name="category" onChange={handleChange}>
            <option value="shoes">Shoes</option>
            <option value="bags">Bags</option>
            <option value="clothes">Clothes</option>
          </select>

          <textarea
            name="specifications"
            placeholder='{"size":[40,41],"color":["black"]}'
            onChange={handleChange}
          />

          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />

          <button type="submit">Create Product</button>
        </form>

        {errorMessage && (
          <p className="form-error">{errorMessage}</p>
        )}
      </div>

      {/* SUCCESS MODAL */}
      {successModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <h3>🎉 Product Created Successfully!</h3>
            <p>Your product has been added to the store.</p>

            <button onClick={handleCloseModal}>
              Back to Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateProduct;