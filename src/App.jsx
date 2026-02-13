import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllProductsCollection from "./pages/AllProductsCollection";
import ShoesCollection from "./pages/ShoesCollection";
import BagsCollection from "./pages/BagsCollection";
import ClothesCollection from "./pages/ClothesCollection";
import CollectiblesItemCollection from "./pages/CollectiblesItemCollection";
import About from "./components/About";
import ProductDetails from "./pages/ProductsDetails";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProductsCollection />} />
        <Route path="/sneakers" element={<ShoesCollection />} />
        <Route path="/bags" element={<BagsCollection />} />
        <Route path="/clothes" element={<ClothesCollection />} />
        <Route path="/collectibles" element={<CollectiblesItemCollection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;