const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://jared:bgp8RBHynqBOWg8U@prayers.c4ysq.mongodb.net/?retryWrites=true&w=majority&appName=Prayers')
// Prayer model
const prayerSchema = new mongoose.Schema({
  name: String,
  prayer: String,
  date: { type: Date, default: Date.now },
});
const Prayer = mongoose.model('Prayer', prayerSchema);

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

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
