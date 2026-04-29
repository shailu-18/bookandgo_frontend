export default function About() {
  return (
    <div className="about-container">
      <h1 className="logo">✈ Book & Go</h1>
      <h2 className="heading">About Us</h2>

      <p className="description">
        Book & Go is your trusted partner for seamless travel experiences worldwide.
        We believe everyone deserves to explore the world without hassle.
      </p>

      <div className="mission-box">
        <h3>Our Mission</h3>
        <p>
          To provide effortless, affordable, and secure travel booking.
        </p>
      </div>

      <h3 className="features-title">Key Features</h3>

      <div className="features">
        <div className="card">
          <h4>✔ Easy Booking</h4>
          <p>Reserve hotels, and activities in minutes</p>
        </div>

        <div className="card">
          <h4>💲 Affordable Trips</h4>
          <p>Best deals at competitive prices</p>
        </div>

        <div className="card">
          <h4>🔒 Secure Service</h4>
          <p>Your data and payments are safe</p>
        </div>
      </div>

      <h3 className="footer">
        Ready to start your next adventure?
      </h3>
    </div>
  );
}