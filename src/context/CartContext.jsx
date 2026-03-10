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
        data.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      fetchCart();
    } else {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      setCart(guestCart);

      setCartCount(guestCart.reduce((acc, item) => acc + item.quantity, 0));
    }
  }, []);

  const addToCart = async (productId, quantity = 1, selectedSize = null) => {
    const token = getToken();

    /* =========================
     USER LOGGED IN
  ========================= */

    if (token) {
      try {
        await api.post(
          "/cart/add",
          { productId, quantity, selectedSize },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        await fetchCart();
      } catch (error) {
        console.error(error);
      }

      return;
    }

    /* =========================
     GUEST USER
  ========================= */

    try {
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

      const existingItem = guestCart.find(
        (item) =>
          item.product._id === productId && item.selectedSize === selectedSize,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const { data } = await api.get(`/products/${productId}`);

        guestCart.push({
          product: data,
          quantity,
          selectedSize,
        });
      }

      localStorage.setItem("guestCart", JSON.stringify(guestCart));

      setCart(guestCart);

      setCartCount(guestCart.reduce((acc, item) => acc + item.quantity, 0));
    } catch (error) {
      console.error(error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    const token = getToken();

    if (token) {
      await api.put(
        "/cart/update",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchCart();
      return;
    }

    /* GUEST USER */

    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

    const item = guestCart.find((i) => i.product._id === productId);

    if (item) {
      item.quantity = quantity;
    }

    localStorage.setItem("guestCart", JSON.stringify(guestCart));

    setCart(guestCart);

    setCartCount(guestCart.reduce((acc, item) => acc + item.quantity, 0));
  };

  const removeCartItem = async (productId) => {
    const token = getToken();

    if (token) {
      await api.delete("/cart/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId },
      });

      await fetchCart();
      return;
    }

    /* GUEST USER */

    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

    guestCart = guestCart.filter((item) => item.product._id !== productId);

    localStorage.setItem("guestCart", JSON.stringify(guestCart));

    setCart(guestCart);

    setCartCount(guestCart.reduce((acc, item) => acc + item.quantity, 0));
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
