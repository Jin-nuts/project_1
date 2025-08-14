import express from "express";
import Review from "../models/Review.js";
import { verifyToken } from "../controllers/authController.js"; // Your JWT middleware

const router = express.Router();

// ✅ Get all reviews (Public)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ✅ Post a review (Protected)
router.post("/", verifyToken, async (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: "Name and comment required" });
  }

  try {
    const newReview = new Review({ name, comment });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to post review" });
  }
});

export default router;
