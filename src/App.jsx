import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

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
import WishlistPage from "./pages/WishList.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLayout from "./Layouts/AdminLayout.jsx";
import AdminAnalytics from "./pages/AdminAnalytics.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminCreateProduct from "./pages/AdminCreateProduct.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import DeliveryAddress from "./pages/DeliveryAddress.jsx";

function LayoutWrapper() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* 🔥 Hide Navbar on Admin Routes */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProductsCollection />} />
        <Route path="/sneakers" element={<ShoesCollection />} />
        <Route path="/bags" element={<BagsCollection />} />
        <Route path="/clothes" element={<ClothesCollection />} />
        <Route path="/collectibles" element={<CollectiblesItemCollection />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersHistory />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/address" element={<DeliveryAddress />} />

        {/* ADMIN ROUTES */}
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="orders" element={<AdminDashboard />} />
          {/* <Route path="users" element={<div>Users Page</div>} /> */}

          {/* PRODUCTS */}
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminCreateProduct />} />

          <Route path="analytics" element={<AdminAnalytics />} />
          <Route
            path="users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>  
              
            }
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <LayoutWrapper />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
