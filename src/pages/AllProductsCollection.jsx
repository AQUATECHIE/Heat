import ProductGrid from '../components/ProductGrid';
import bagImage from "../assets/bag.png";
import jacketImage from "../assets/jac.png";
import Footer from '../components/Footer';

const AllProductsCollection = () => {
  const products = [
    { id: 1, name: "GG EMBLEM MEDIUM DUFFLE BAG", price: "R3,800", image: bagImage },
    { id: 2, name: "PRADA NORDSTROM", price: "R1,700", image: jacketImage },
    { id: 3, name: "GG EMBLEM MEDIUM DUFFLE BAG", price: "R3,800", image: bagImage },
    { id: 4, name: "PRADA NORDSTROM", price: "R1,700", image: jacketImage },
  ];

  return (
    <>
        <ProductGrid title="ALL PRODUCTS" products={products} />
        <Footer />
    </>
  );

}

export default AllProductsCollection
