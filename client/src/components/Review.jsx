import React, { useState, useEffect } from "react";
import "./Review.css";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReviewSection = () => {
  const { isAuthenticated, user, token } = useAuth(); // Assume token is stored in context
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: "", comment: "" });

  // ✅ Fetch reviews on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          name: formData.name,
          comment: formData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews([res.data, ...reviews]);
      setFormData({ name: "", comment: "" });
    } catch (err) {
      console.error("Failed to post review", err);
    }
  };

  return (
    <section className="review-box">
      <h2 className="review-heading">What People Say</h2>

      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={!isAuthenticated}
        />
        <textarea
          name="comment"
          placeholder="Write a quick review..."
          value={formData.comment}
          onChange={handleChange}
          required
          disabled={!isAuthenticated}
        />
        <button type="submit" className="buy-button" disabled={!isAuthenticated}>
          Submit
        </button>
        {!isAuthenticated && (
          <p className="login-warning">Please log in to post a review.</p>
        )}
      </form>

      <div className="review-list">
        {reviews.length === 0 ? (
          <p className="no-review">No reviews yet. Be the first to share!</p>
        ) : (
          reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="reviewer-name">{r.name}</div>
              <p className="review-text">“{r.comment}”</p>
              <small className="review-date">
                {new Date(r.date).toLocaleDateString()}
              </small>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
