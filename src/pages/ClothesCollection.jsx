import { useEffect, useState } from "react";
import api from "../api/axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const ClothesCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClothes = async () => {
    try {
      const { data } = await api.get("/products?category=clothes");

      setProducts(data.products || data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClothes();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Clothes...</h2>;
  }

  return (
    <>
      <ProductGrid title="CLOTHES" products={products} />
      <Footer />
    </>
  );
};

export default ClothesCollection;