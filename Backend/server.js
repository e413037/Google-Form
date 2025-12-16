const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Enable CORS for frontend
app.use(cors());

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://abdulkalam8159_db_user:UIFmNjGuQlhzFEJg@abdul.6lsdera.mongodb.net/?appName=Abdul",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema & Model
const FormData = mongoose.model(
  "FormData",
  new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now },
  })
);

// POST Route - Save form data
app.post("/api/form", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newData = new FormData({ name, email, message });
    await newData.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving form data" });
  }
});

// GET Route - View all submissions
app.get("/api/form", async (req, res) => {
  const data = await FormData.find();
  res.json(data);
});

// Start server on port 5000
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
