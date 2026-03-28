import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AdminCreateProduct.css";

const AdminEditProduct = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
    brand: "",
    stock: "",
    sizes: "",
    colors: ""
  });

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  /* FETCH CATEGORIES */

  useEffect(() => {
    api.get("/categories").then((res)=>{
      setCategories(res.data);
    });
  }, []);

  /* FETCH PRODUCT */

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
          sizes: data.specifications?.size?.join(", ") || "",
          colors: data.specifications?.color?.join(", ") || ""
        });

        setLoading(false);

      } catch (error) {

        console.error(error);

      }

    };

    fetchProduct();

  }, [id]);

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  /* UPDATE PRODUCT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const specifications = {
        size: form.sizes
          ? form.sizes.split(",").map((s)=>s.trim())
          : [],
        color: form.colors
          ? form.colors.split(",").map((c)=>c.trim())
          : []
      };

      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        discount: form.discount,
        category: form.category,
        brand: form.brand,
        stock: form.stock,
        specifications
      };

      await api.put(`/products/${id}`, payload, {
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      navigate("/admin/products");

    } catch (error) {

      setErrorMessage(
        error.response?.data?.message || "Update failed"
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

            {/* CATEGORY FROM DATABASE */}

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >

              <option value="">Select Category</option>

              {categories.map((cat)=>(
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}

            </select>

          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          {/* SIZE INPUT */}

          <input
            name="sizes"
            placeholder="Sizes (e.g. S,M,L,XL)"
            value={form.sizes}
            onChange={handleChange}
          />

          {/* COLOR INPUT */}

          <input
            name="colors"
            placeholder="Colors (e.g. Black,White)"
            value={form.colors}
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