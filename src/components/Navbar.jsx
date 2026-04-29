import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo (click → Home) */}
      <img
        src="https://tse2.mm.bing.net/th/id/OIP.U5LR7kR6TBoiXbVk1BVbzwHaG8?pid=Api&P=0&h=180"
        alt="Book & Go Logo"
        className="logo"
        onClick={() => navigate("/")}
      />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/details">Details</Link></li>
        <li><Link to="/booking">Booking Form</Link></li>
        <li><Link to="/my-bookings">My Bookings</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/contact">Contact</Link></li>
         {user?.role === "admin" && (
  <li><Link to="/admin">Admin</Link></li>
)}

        {/* Logout */}
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

