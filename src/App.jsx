import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllProductsCollection from "./pages/AllProductsCollection";
import ShoesCollection from "./pages/ShoesCollection";
import BagsCollection from "./pages/BagsCollection";
import ClothesCollection from "./pages/ClothesCollection";
import CollectiblesItemCollection from "./pages/CollectiblesItemCollection";
import About from "./components/About";
import ProductDetails from "./pages/ProductsDetails";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrdersHistory from "./pages/OrderHistory.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import WishlistPage from "./pages/WishList.jsx";

function App() {
  return (
    <CartProvider>
      {" "}
      {/* 👈 WRAP EVERYTHING */}
      <WishlistProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProductsCollection />} />
            <Route path="/sneakers" element={<ShoesCollection />} />
            <Route path="/bags" element={<BagsCollection />} />
            <Route path="/clothes" element={<ClothesCollection />} />
            <Route
              path="/collectibles"
              element={<CollectiblesItemCollection />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersHistory />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
