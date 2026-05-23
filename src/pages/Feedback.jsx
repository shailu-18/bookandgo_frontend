import { useState, useEffect } from "react";
import axios from "axios";

export default function Feedback() {
  const API =
    "https://bookandgo-backend.onrender.com/api/feedbacks";

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [editId, setEditId] = useState(null);

  // Load feedback
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API);

      // Only logged-in user feedback
      const userFeedbacks = res.data.filter(
        (item) => item.email === user?.email
      );

      setFeedbacks(userFeedbacks);

    } catch (err) {
      console.log(err);
    }
  };

  // Submit / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter feedback");
      return;
    }

    const data = {
      email: user?.email,
      message,
      rating: Number(rating),
      date: new Date().toLocaleDateString()
    };

    try {

      // UPDATE
      if (editId) {

        await axios.put(
          `${API}/${editId}`,
          data
        );

        alert(
          "Feedback updated successfully"
        );

        setEditId(null);

      }

      // ADD
      else {

        await axios.post(
          API,
          data
        );

        alert(
          "Feedback submitted successfully"
        );

      }

      setMessage("");
      setRating(5);

      fetchFeedbacks();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to save feedback"
      );
    }
  };

  // Edit
  const handleEdit = (fb) => {
    setMessage(
      fb.message
    );

    setRating(
      fb.rating
    );

    setEditId(
      fb._id
    );
  };

  // Delete
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `${API}/${id}`
      );

      alert(
        "Feedback deleted successfully"
      );

      fetchFeedbacks();

    } catch (err) {

      console.log(err);

      alert(
        "Failed to delete feedback"
      );
    }
  };

  // Average Rating
  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (sum, item) =>
              sum + item.rating,
            0
          ) / feedbacks.length
        ).toFixed(1)
      : 0;

  return (
    <div className="feedback-container">

      <h2>
        Feedback & Reviews ⭐
      </h2>

      <h3>
        Average Rating :
        ⭐ {averageRating}/5
      </h3>

      <form onSubmit={handleSubmit}>

        <input
          value={user?.email || ""}
          readOnly
        />

        <textarea
          placeholder="Enter feedback..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          required
        />

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              e.target.value
            )
          }
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐
          </option>

          <option value={4}>
            ⭐⭐⭐⭐
          </option>

          <option value={3}>
            ⭐⭐⭐
          </option>

          <option value={2}>
            ⭐⭐
          </option>

          <option value={1}>
            ⭐
          </option>

        </select>

        <button type="submit">

          {editId
            ? "Save Update"
            : "Submit Feedback"}

        </button>

      </form>

      <h3>Your Feedback</h3>

      {feedbacks.length === 0 ? (

        <p>No feedback added yet</p>

      ) : (

        feedbacks.map((fb) => (

          <div
            key={fb._id}
            className="feedback-item"
          >

            <p>
              {fb.message}
            </p>

            <p>
              {"⭐".repeat(
                fb.rating
              )}
            </p>

            <small>
              {fb.date}
            </small>

            <br />
            <br />

            <button
              onClick={() =>
                handleEdit(fb)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(
                  fb._id
                )
              }
              style={{
                marginLeft:"10px",
                background:"red",
                color:"white"
              }}
            >
              Delete
            </button>

          </div>

        ))
      )}

    </div>
  );
}