import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import "../styles/WishlistPage.css";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item) => {
    if (item.category === "shoes" && !item.selectedSize) {
      alert("Please select size before adding to cart.");
      return;
    }

    try {
      await addToCart(
        item._id,
        1,
        item.selectedSize || null
      );

      toggleWishlist(item);

    } catch (error) {
      console.error("Failed to add to cart");
    }
  };

  return (
    <>
      <div className="wishlist-page">

        <h2 className="wishlist-title">Saved Items</h2>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (

          <div className="wishlist-list">

            {wishlistItems.map((item) => (

              <div key={item._id} className="wishlist-item">

                <img
                  src={item.images?.[0]?.url}
                  alt={item.name}
                />

                <div className="wishlist-details">

                  <p className="wishlist-name">
                    {item.name}
                  </p>

                  {item.discount > 0 ? (
                    <div className="wishlist-price">

                      <span className="old-price">
                        R{Number(item.price).toLocaleString()}
                      </span>

                      <span className="new-price">
                        R{Number(item.finalPrice).toLocaleString()}
                      </span>

                    </div>
                  ) : (
                    <p className="wishlist-price">
                      R{Number(item.price).toLocaleString()}
                    </p>
                  )}

                  {item.selectedSize && (
                    <span className="wishlist-size">
                      Size - {item.selectedSize}
                    </span>
                  )}

                </div>


                <div className="wishlist-actions">

                  <button
                    className="move-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    Move to Cart
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