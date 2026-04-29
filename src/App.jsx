import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import MyWishlist from "./pages/MyWishlist";
import HelpChat from "./components/HelpChat";
import AdminDashboard from "./pages/AdminDashboard";

// 🔐 Protected Route
function PrivateRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin" ? children : <Navigate to="/" />;
}

export default function App() {
  const user = localStorage.getItem("user");

  return (
    <div className="app-bg">
      <div className="app-overlay"></div>

      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoute>
           <AdminDashboard />
    </AdminRoute>
  }
/>

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
        <Route path="/details" element={<PrivateRoute><Details /></PrivateRoute>} />
        <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
        <Route path="/confirmation" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute><MyWishlist /></PrivateRoute>}/>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {user && <HelpChat />}
    </div>
  );
}