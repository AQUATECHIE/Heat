import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminCreateProduct.css";

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
    brand: "",
    stock: "",
    sizes: "",
    colors: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [successModal, setSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      const { sizes, colors, ...rest } = form;

      Object.keys(rest).forEach((key) => {
        formData.append(key, rest[key]);
      });

      const specifications = {
        size: sizes
          ? sizes
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          : [],

        color: colors
          ? colors
              .split(",")
              .map((c) => c.trim())
              .filter((c) => c !== "")
          : [],
      };

      formData.append("specifications", JSON.stringify(specifications));

      images.forEach((img) => {
        formData.append("images", img);
      });

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
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
          <div className="form-grid">
            <input
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
              required
            />

            <input
              name="brand"
              placeholder="Brand"
              onChange={handleChange}
              required
            />

            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              required
            />

            <input
              name="discount"
              type="number"
              placeholder="Discount %"
              min="0"
              max="90"
              onChange={handleChange}
            />

            <input
              name="stock"
              type="number"
              placeholder="Stock"
              onChange={handleChange}
              required
            />

            <select name="category" onChange={handleChange}>
              <option>Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
            required
          />

          <input
            name="sizes"
            placeholder="Sizes (e.g. 40,41,42)"
            onChange={handleChange}
          />

          <input
            name="colors"
            placeholder="Colors (e.g. Black,White)"
            onChange={handleChange}
          />

          <div className="image-upload">
            <label>Upload Images</label>

            <input type="file" multiple onChange={handleImageChange} />

            {previewImages.length > 0 && (
              <div className="image-preview">
                {previewImages.map((img, index) => (
                  <img key={index} src={img} alt="preview" />
                ))}
              </div>
            )}
          </div>

          <button type="submit">Create Product</button>
        </form>

        {errorMessage && <p className="form-error">{errorMessage}</p>}
      </div>

      {successModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <h3>🎉 Product Created Successfully</h3>

            <p>Your product has been added.</p>

            <button onClick={handleCloseModal}>Back to Products</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCreateProduct;
