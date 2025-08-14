// your imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 👇 check this line
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB connection error", err));

// 👇 check this line
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
