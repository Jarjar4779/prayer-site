import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS


const PrayerForm = () => {
  const [name, setName] = useState('');
  const [prayer, setPrayer] = useState('');
  const [prayers, setPrayers] = useState([]);

  // Fetch existing prayers from the server when the component loads
  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const response = await axios.get('https://prayer-site.onrender.com');
        setPrayers(response.data);
      } catch (error) {
        console.error('Error fetching prayers:', error);
      }
    };
    fetchPrayers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://prayer-site.onrender.com', {
        name,
        prayer,
      });
      setPrayers([response.data, ...prayers]); // Add the new prayer to the state
      setName('');
      setPrayer('');
    } catch (error) {
      console.error('Error submitting prayer:', error);
    }
  };

  return (
    <div>
      <h1>Prayer Requests</h1>
      <form onSubmit={handleSubmit} className="sticky-form">
      <textarea
          placeholder="What you need prayer for"
          value={prayer}
          onChange={(e) => setPrayer(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Your name (Optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit Prayer</button>
      </form>

      <div className="prayer-list">
        {prayers.map((prayerRequest) => (
          <div key={prayerRequest._id} className="prayer-item">
            <h3>{prayerRequest.prayer}</h3>
            <p>{prayerRequest.name}</p>
            <small>{new Date(prayerRequest.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerForm;
