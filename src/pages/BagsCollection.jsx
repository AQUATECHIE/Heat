import React from 'react'
import ProductGrid from '../components/ProductGrid';
import bagImage from "../assets/bag.png";
import jacketImage from "../assets/jac.png";
import Footer from '../components/Footer';
const BagsCollection = () => {
  
  const products = [
    { id: 1, name: "BOSPHORE WEARABLE WALLET", price: "R2,400", image: bagImage },
    { id: 2, name: "BOSPHORE WEARABLE WALLET", price: "R2,400", image: jacketImage },
    { id: 3, name: "BOSPHORE WEARABLE WALLET", price: "R2,400", image: bagImage },
    { id: 4, name: "BOSPHORE WEARABLE WALLET", price: "R2,400", image: jacketImage },
  ];

  return (
    <>
        <ProductGrid title="BAGS" products={products} />
        <Footer />
    </>
  );
}

export default BagsCollection
