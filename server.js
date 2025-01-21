require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

// Prayer Model
const PrayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prayer: { type: String, required: true },
});

const Prayer = mongoose.model('Prayer', PrayerSchema);

// Routes
// GET route for prayers
app.get('/api/prayers', async (req, res) => {
  try {
    const prayers = await Prayer.find();
    res.json(prayers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route for submitting prayer requests
app.post('/api/prayers', async (req, res) => {
  const { name, prayer } = req.body;

  const newPrayer = new Prayer({
    name,
    prayer,
  });

  try {
    const savedPrayer = await newPrayer.save();
    res.json(savedPrayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
