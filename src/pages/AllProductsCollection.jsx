import { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const AllProductsCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/products?page=${page}&limit=10`
      );

      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

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