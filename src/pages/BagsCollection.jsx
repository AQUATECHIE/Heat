import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const BagsCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBags = async () => {
    try {
      const { data } = await api.get("/products", {
        params: { category: "bags" }, // ✅ cleaner query handling
      });

      setProducts(data.products || data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch bags"
      );
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    fetchBags();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Bags...</h2>;
  }

  return (
    <>
      <ProductGrid title="BAGS" products={products} />
      <Footer />
    </>
  );
};

export default BagsCollection;