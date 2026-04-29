import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState("");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
  localStorage.removeItem("destination");
  localStorage.removeItem("selectedCity");
}, []);

  const images = [
    "https://www.fabhotels.com/blog/wp-content/uploads/2018/09/Gateway-of-India-1.jpg",
    "http://cdn.wionews.com/sites/default/files/2023/06/18/360332-13.jpg",
    "https://irisholidays.com/keralatourism/wp-content/uploads/2018/12/trivandrum.jpg",
    "https://www.fabhotels.com/blog/wp-content/uploads/2022/01/cliched-destinations-in-india-feature-image-600X400.jpg",
    "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2024/01/04/a78cca898cea0087e9d53674e5e1914f_1000x1000.jpg"
  ];

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle button click
  const handleExplore = () => {
    if (!selectedCity) {
      alert("Please select a city");
      return;
    }

    // Save city correctly
    localStorage.setItem("selectedCity", selectedCity);

    // Navigate to details page
    navigate("/details");
  };

  return (
    <section className="home">
      <h2>📍 Explore Famous Places</h2>

      {/* City Selector */}
      <div className="state-selector">
        <label>Select Your City:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      <button className="explore-btn" onClick={handleExplore}>
        View Trips
      </button>

      {/* AUTO SLIDER */}
      <div className="slider">
        <img src={images[current]} alt="travel" />
      </div>
    </section>
  );
}