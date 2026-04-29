import { useState, useEffect } from "react";
import axios from "axios";

export default function Feedback() {
  const [messageSent, setMessageSent] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(5);

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Load feedbacks from backend
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/feedbacks"
      );
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Submit feedback (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      email: user?.email,
      message: e.target.message.value,
      rating: Number(rating),
      date: new Date().toLocaleDateString(),
    };

    try {
      await axios.post(
        "http://localhost:5000/api/feedbacks",
        newFeedback
      );

      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 3000);

      e.target.reset();
      setRating(5);

      fetchFeedbacks(); // reload

    } catch (err) {
      console.error(err);
      alert("Error saving feedback");
    }
  };

  // ✅ Delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/feedbacks/${id}`
      );

      fetchFeedbacks();

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Average Rating
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) /
          feedbacks.length
        ).toFixed(1)
      : 0;

  return (
    <div className="feedback-container">
      <h2>Feedback & Reviews 💬⭐</h2>

      <h3>Average Rating: ⭐ {averageRating} / 5</h3>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* ✅ Show logged user */}
        <input
          name="email"
          value={user?.email || ""}
          readOnly
        />

        <textarea name="message" placeholder="Message" required />

        {/* ⭐ Rating */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button type="submit">
          {editIndex !== null ? "Update Feedback" : "Submit"}
        </button>
      </form>

      {messageSent && (
        <p className="success-msg">✅ Feedback submitted successfully!</p>
      )}

      {/* LIST */}
      <div className="feedback-list">
        <h3>User Reviews</h3>

        {feedbacks.length === 0 ? (
          <p>No feedback yet</p>
        ) : (
          feedbacks.map((fb, i) => (
            <div key={fb.id} className="feedback-item">
              <p><b>{fb.email}</b></p>
              <p>{fb.message}</p>

              {/* ⭐ stars */}
              <p>{"⭐".repeat(fb.rating || 0)}</p>

              {/* 📅 date */}
              <small>{fb.date}</small>

              <br />

              <button onClick={() => handleEdit(i)}>Edit</button>

              <button
                onClick={() => handleDelete(i)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white"
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}