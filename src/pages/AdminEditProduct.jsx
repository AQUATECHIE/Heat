import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AdminCreateProduct.css";

const AdminEditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "shoes",
    brand: "",
    stock: "",
    specifications: "",
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct = async () => {
      try {

        const { data } = await api.get(`/products/${id}`);

        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount || 0,
          category: data.category,
          brand: data.brand,
          stock: data.stock,
          specifications: JSON.stringify(data.specifications),
        });

        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();

  }, [id]);

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

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      await api.put(`/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/products");

    } catch (error) {

      setErrorMessage(
        error.response?.data?.message || "Update fail"
      );

    }
  };

  if (loading) return <p>Loading product...</p>;

  return (

    <div className="admin-create">

      <div className="create-card">

        <h2>Edit Product</h2>

        <form onSubmit={handleSubmit} className="create-form">

          <div className="form-grid">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
            />

            <input
              name="discount"
              type="number"
              value={form.discount}
              onChange={handleChange}
            />

            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="shoes">Shoes</option>
              <option value="bags">Bags</option>
              <option value="clothes">Clothes</option>
            </select>

          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <textarea
            name="specifications"
            value={form.specifications}
            onChange={handleChange}
          />

          <button type="submit">
            Update Product
          </button>

        </form>

        {errorMessage && (
          <p className="form-error">{errorMessage}</p>
        )}

      </div>

    </div>

  );

};

export default AdminEditProduct;