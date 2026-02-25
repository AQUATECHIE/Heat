import { useEffect, useState } from "react";
import api from "../api/axios"; 

import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const BagsCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBags = async () => {
    try {
      const { data } = await api.get("/products?category=bags");

      setProducts(data.products || data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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