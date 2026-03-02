import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data.products || data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete this product?")) return;

    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>Manage Products</h2>

        <Link to="new" className="create-btn">
          + Add Product
        </Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="admin-product-card">
            <div className="product-img">
              <img
                src={product.images?.[0]?.url || "/fallback.png"}
                alt={product.name}
              />
            </div>

            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="price">
                ₦{product.price.toLocaleString()}
              </p>
              <p className="stock">
                Stock: {product.stock}
              </p>
            </div>

            <div className="admin-actions">
              <Link
                to={`/admin/products/edit/${product._id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                className="delete-btn"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;