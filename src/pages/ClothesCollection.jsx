import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const ClothesCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchClothes = async () => {
    try {
      const { data } = await api.get("/products", {
        params: {
          category: "clothes",
          page: page,
          limit: 10,
        },
      });

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch clothes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, [page]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Clothes...</h2>;
  }

  return (
    <>
      <ProductGrid title="CLOTHES" products={products} />

      {/* Pagination */}
      {/* <div className="pagination">
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
      </div> */}

      <Footer />
    </>
  );
};

export default ClothesCollection;