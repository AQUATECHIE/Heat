import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // 🔥 Always read token dynamically
  const getToken = () => localStorage.getItem("token");

  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(data.items || []);
      setCartCount(
        data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1, selectedSize = null) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await api.post(
        "/cart/add",
        { productId, quantity, selectedSize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    const token = getToken();
    if (!token) return;

    await api.put(
      "/cart/update",
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await fetchCart();
  };

  const removeCartItem = async (productId) => {
    const token = getToken();
    if (!token) return;

    await api.delete("/cart/remove", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { productId },
    });

    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        updateCartItem,
        removeCartItem,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);