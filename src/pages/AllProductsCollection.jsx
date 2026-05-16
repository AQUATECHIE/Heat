import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";

const AllProductsCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products", {
        params: {
          page,
          limit: 10,
          category,
        },
      });

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
  }, [page, category]);

  useEffect(() => {
    if (!category) {
      setCategoryName("");
      return;
    }

    const fetchCategory = async () => {
      try {
        const { data } = await api.get("/categories");

        const currentCategory = data.find(
          (cat) => cat._id === category
        );

        setCategoryName(currentCategory?.name || "");
      } catch (error) {
        console.error("Category fetch failed");
      }
    };

    fetchCategory();
  }, [category]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  return (
    <>
      <ProductGrid
        title={
          categoryName
            ? categoryName.toUpperCase()
            : "ALL PRODUCTS"
        }
        products={products}
      />

      <Footer />
    </>
  );
};

export default AllProductsCollection;