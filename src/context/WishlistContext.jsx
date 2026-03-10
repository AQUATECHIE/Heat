import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

  const [wishlistItems, setWishlistItems] = useState([]);

  /* LOAD FROM LOCAL STORAGE */

  useEffect(() => {

    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlistItems(savedWishlist);

  }, []);


  /* SAVE TO LOCAL STORAGE */

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);


  /* CHECK IF PRODUCT IS IN WISHLIST */

  const isInWishlist = (id) => {

    return wishlistItems.some(
      (item) => item._id === id
    );

  };


  /* TOGGLE WISHLIST */

  const toggleWishlist = (product) => {

    setWishlistItems((prev) => {

      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) {

        return prev.filter(
          (item) => item._id !== product._id
        );

      } else {

        return [...prev, product];

      }

    });

  };


  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);