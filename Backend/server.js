const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));

// ✅ MongoDB connection (using your provided URI)
mongoose.connect("mongodb+srv://abdulkalam8159_db_user:UIFmNjGuQlhzFEJg@abdul.6lsdera.mongodb.net/?appName=Abdul")
  .then(() => console.log("✅ MongoDB Connected to Abdul Cluster"))
  .catch((err) => console.log(err));

// ✅ Schema & Model
const FormData = mongoose.model("FormData",new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now },
  })
);

// ✅ POST Route - Save Form Data
app.post("/api/form", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newData = new FormData({ name, email, message });
    await newData.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving form data" });
  }
});

// ✅ GET Route - View All Submissions
app.get("/api/form", async (req, res) => {
  const data = await FormData.find();
  res.json(data);
});

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
