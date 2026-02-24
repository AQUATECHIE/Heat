import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "../styles/WishlistPage.css";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    // 🔥 If product has sizes but no size selected
    if (item.category === "shoes" && !item.size) {
      alert("Please select size before adding to cart.");
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      images: item.images,
      category: item.category,
      quantity: 1,
      size: item.size || item.selectedsize,
    });

    // 🔥 Remove from wishlist after adding
    toggleWishlist(item);
  };

  return (
    <>
      <div className="wishlist-page">
        <h2>Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-card">
                <img src={item.images?.[0]} alt={item.name} />

                <div className="wishlist-info">
                  <p>{item.name}</p>
                  <span>{item.price}</span>
                </div>

                <div className="wishlist-actions">
                  <button
                    className="move-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => toggleWishlist(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default WishlistPage;
