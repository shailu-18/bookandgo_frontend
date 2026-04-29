import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const stored =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    // ✅ Filter only current user items
    const userWishlist = stored.filter(
      (item) => item.email === user?.email
    );

    setWishlist(userWishlist);
  }, []);

 const removeItem = (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  let stored = JSON.parse(localStorage.getItem("wishlist")) || [];

  const updated = stored.filter(
    (item) => item.id !== id
  );

  localStorage.setItem("wishlist", JSON.stringify(updated));

  // ✅ update only current user data
  const userWishlist = updated.filter(
    (item) => item.email === user?.email
  );

  setWishlist(userWishlist);
};

  return (
    <div className="wishlist-container">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No saved trips</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <p><strong>{item.destination}</strong></p>
            <p>Adult: ₹{item.price}</p>
            <p>Child: ₹{item.childPrice}</p> 

            <button onClick={() => removeItem(item.id)}>
              Remove ❌
            </button>
          </div>
        ))
      )}
    </div>
  );
}