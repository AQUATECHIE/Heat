import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const BagsCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBags = async () => {
    try {
      const { data } = await api.get("/products", {
        params: {
          category: "bags",
          page: page,
          limit: 10,
        },
      });

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch bags"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBags();
  }, [page]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Bags...</h2>;
  }

  return (
    <>
      <ProductGrid title="BAGS" products={products} />

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

      <Footer />
    </>
  );
};

export default BagsCollection;