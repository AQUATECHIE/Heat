import React from "react";
import ProductGrid from "../components/ProductGrid";
import bagImage from "../assets/bag.png";
import jacketImage from "../assets/jac.png";
import Footer from "../components/Footer";
const CollectiblesItemCollection = () => {
  const products = [
    { id: 1, name: "LIMITED EDITION ITEM", price: "R6,000", image: bagImage },
    {
      id: 2,
      name: "LIMITED EDITION ITEM",
      price: "R6,000",
      image: jacketImage,
    },
    {
      id: 3,
      name: "LIMITED EDITION ITEM",
      price: "R6,000",
      image: jacketImage,
    },
    {
      id: 4,
      name: "LIMITED EDITION ITEM",
      price: "R6,000",
      image: jacketImage,
    },
  ];

  return (
    <>
        <ProductGrid title="COLLECTIBLE ITEMS" products={products} />
        <Footer />
    </>
  );
};

export default CollectiblesItemCollection;
