import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products", {
        params: {
          page,
          limit: 20,
          keyword: search,
          category: category,
        },
      });

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  };

  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${selectedProduct._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteModal(false);
      setSelectedProduct(null);

      fetchProducts();
    } catch (error) {
      console.error("Delete failed");
    }
  };

  return (
    <div className="admin-products">

      <div className="admin-products-header">
        <h2>Manage Products</h2>

        <Link to="new" className="create-btn">
          + Add Product
        </Link>
      </div>

      {/* SEARCH + FILTER */}
      <div className="admin-filters">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="">All Categories</option>
          <option value="shoes">Shoes</option>
          <option value="bags">Bags</option>
          <option value="clothes">Clothes</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {products.map((product) => {

          const hasDiscount = product.discount > 0;

          return (
            <div key={product._id} className="admin-product-card">

              <div className="product-img">

                {hasDiscount && (
                  <div className="discount-badge">
                    -{product.discount}%
                  </div>
                )}

                <img
                  src={product.images?.[0]?.url || "/fallback.png"}
                  alt={product.name}
                />
              </div>

              <div className="product-info">

                <h4>{product.name}</h4>

                <p className="price">

                  {hasDiscount ? (
                    <>
                      <span className="old-price">
                        R{product.price.toLocaleString()}
                      </span>

                      <span className="new-price">
                        R{product.finalPrice?.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <>R{product.price.toLocaleString()}</>
                  )}

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
                  onClick={() => confirmDelete(product)}
                >
                  Delete
                </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="modal-overlay">

          <div className="delete-modal">

            <h3>Delete Product</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedProduct?.name}</strong>?
            </p>

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={deleteProduct}
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default AdminProducts;