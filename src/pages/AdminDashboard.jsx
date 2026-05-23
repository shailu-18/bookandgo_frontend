import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const storedFeedbacks =
      JSON.parse(localStorage.getItem("feedbacks")) || [];

    // ✅ Unique users from bookings
    const uniqueUsers = [
      ...new Map(storedBookings.map((b) => [b.name, b])).values(),
    ];

    setBookings(storedBookings);
    setFeedbacks(storedFeedbacks);
    setUsers(uniqueUsers);
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>🛠️ Admin Dashboard</h2>

      {/* 🔹 Overview Cards */}
      <div className="admin-cards">
        <div className="card">
          <h3>{bookings.length}</h3>
          <p>📦 Bookings</p>
        </div>

        <div className="card">
          <h3>{users.length}</h3>
          <p>👥 Users</p>
        </div>

        <div className="card">
          <h3>{feedbacks.length}</h3>
          <p>💬 Feedbacks</p>
        </div>
      </div>

      {/* 📦 BOOKINGS */}
      <div className="admin-section">
        <h3>📦 Recent Bookings</h3>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map((b) => (
            <div key={b.id} className="admin-item">
              <p><strong>{b.name}</strong></p>
              <p>Email: {b.email}</p>
              <p>Destination: {b.destination}</p>
              <p>Date: {b.date}</p>
              <p>Duration: {b.duration}</p>
              <p>Adults: {b.adults}</p>
              <p>Children: {b.children}</p>
              <p>Total: {b.totalPrice}</p>
            </div>
          ))
        )}
      </div>

      {/* 👥 USERS */}
      <div className="admin-section">
        <h3>👥 Users</h3>

        {users.map((u, i) => (
          <div key={i} className="admin-item">
            <p>👤 {u.email}</p>
          </div>
        ))}
      </div>

      {/* 💬 FEEDBACK */}
      <div className="admin-section">
        <h3>💬 Feedbacks</h3>

        {feedbacks.length === 0 ? (
          <p>No feedback yet</p>
        ) : (
          feedbacks.map((f, i) => (
            <div key={i} className="admin-item">
              <p><strong>{f.email}</strong></p>
              <p>{f.message}</p>
              <p>{"⭐".repeat(f.rating || 0)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}