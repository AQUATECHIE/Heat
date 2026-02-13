import React from 'react'
import ProductGrid from '../components/ProductGrid';
import bagImage from "../assets/bag.png";
import jacketImage from "../assets/jac.png";
import Footer from '../components/Footer';

const ClothesCollection = () => {
  const products = [
    { id: 1, name: "LV PADDED LEATHER BLOUSON", price: "R4,500", image: jacketImage },
    { id: 1, name: "LV PADDED LEATHER BLOUSON", price: "R4,500", image: bagImage },
    { id: 1, name: "LV PADDED LEATHER BLOUSON", price: "R4,500", image: jacketImage },
    { id: 1, name: "LV PADDED LEATHER BLOUSON", price: "R4,500", image: bagImage },
  ];

  return (
    <>
        <ProductGrid title="CLOTHES" products={products} />
        <Footer />
    </>
  );
}

export default ClothesCollection
