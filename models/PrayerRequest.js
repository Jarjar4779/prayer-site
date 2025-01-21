const mongoose = require('mongoose');

// Define the schema for prayer requests
const prayerRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  prayer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the model based on the schema
const PrayerRequest = mongoose.model('PrayerRequest', prayerRequestSchema);

module.exports = PrayerRequest;
