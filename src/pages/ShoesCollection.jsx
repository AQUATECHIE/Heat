import React from 'react'
import ProductGrid from '../components/ProductGrid';
import shoe1 from "../assets/shoe.png";
import shoe2 from "../assets/shoe2.png";
import Footer from '../components/Footer';

const ShoesCollection = () => {
   const products = [
    { id: 1, name: "NEW BALANCE 9060", price: "R1,200", image: shoe1 },
    { id: 2, name: "LV TRAINER SNEAKER", price: "R1,800", image: shoe2, discount: 14 },
    { id: 3, name: "NEW BALANCE 9060", price: "R1,200", image: shoe1 },
    { id: 4, name: "LV TRAINER SNEAKER", price: "R1,800", image: shoe2, discount: 14 },
  ];

  return (
    <>
        <ProductGrid title="SNEAKERS" products={products} />
        <Footer />
    </>
  );
};


export default ShoesCollection
