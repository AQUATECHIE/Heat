import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const ShoesCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShoes = async () => {
    try {
      const { data } = await api.get("/products", {
        params: { category: "shoes" }, // ✅ cleaner query handling
      });

      setProducts(data.products || data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch shoes"
      );
    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    fetchShoes();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Sneakers...</h2>;
  }

  return (
    <>
      <ProductGrid title="SNEAKERS" products={products} />
      <Footer />
    </>
  );
};

export default ShoesCollection;