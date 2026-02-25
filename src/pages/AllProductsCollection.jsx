import { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const AllProductsCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/products"
      );

      // If you're returning pagination object
      setProducts(data.products || data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  return (
    <>
      <ProductGrid title="ALL PRODUCTS" products={products} />
      <Footer />
    </>
  );
};

export default AllProductsCollection;