export default function Contact() {
  return (
    <section className="contact-page">
      
      <div className="main-container">
        <h2>Contact Us ✈️</h2>

        <p className="tagline">
          Your dream journey starts here — let’s make it unforgettable 🌍
        </p>

        {/* Contact Info */}
        <div className="contact-info">
          <p>📧 <strong>bookandgo@gmail.com</strong></p>
          <p>📞 <strong>+08317397400</strong></p>
          <p>📍 <strong>Bangalore, India</strong></p>
        </div>

        {/* Emotional Text */}
        <div className="emotional-text">
          <p>✨ “Don’t just dream it… travel it.”</p>
          <p>💖 “Create memories that last a lifetime.”</p>
          <p>🌄 “Adventure is calling — and we’re here to guide you.”</p>
        </div>

        {/* Features */}
        <div className="features">
          <div className="feature-card">
            <h4>🌍 Explore</h4>
            <p>Discover amazing destinations.</p>
          </div>

          <div className="feature-card">
            <h4>💸 Affordable</h4>
            <p>Best travel packages for everyone.</p>
          </div>

          <div className="feature-card">
            <h4>🧳 Easy Booking</h4>
            <p>Simple and hassle-free experience.</p>
          </div>
        </div>

        {/* Social Links */}
        <h3>Connect With Us</h3>
        <div className="social-links">
          <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
    alt="Facebook"
    className="icon"
  />
</a>

<a href="https://instagram.com/your-page" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
    alt="Instagram"
    className="icon"
  />
</a>

<a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
    alt="Twitter"
    className="icon"
  />
</a>

<a href="https://youtube.com/your-channel" target="_blank" rel="noopener noreferrer">
  <img
    src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
    alt="YouTube"
    className="icon"
  />
</a>
        </div>

        <p className="footer-text">
          We’re available 24/7 to help you plan your perfect trip 😊
        </p>
      </div>

    </section>
  );
}