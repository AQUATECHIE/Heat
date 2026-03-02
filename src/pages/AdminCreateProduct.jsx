import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminCreateProduct.css"

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();

    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await api.post("/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    navigate("/admin/products");
  };

  return (
    <div className="admin-create">
      <div className="create-card">
        <h2>Create Product</h2>

        <form onSubmit={handleSubmit} className="create-form">
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input name="price" placeholder="Price" onChange={handleChange} />
          <input name="brand" placeholder="Brand" onChange={handleChange} />
          <input name="stock" placeholder="Stock" onChange={handleChange} />

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
      </div>
    </div>
  );
};

export default AdminCreateProduct;
