import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      
      const userData = {
        email: email,
        role: email === "shalini@gmail.com" ? "admin" : "user"
      };

      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } else {
      alert("Please enter email & password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">

        {/* ✅ Logo + Text */}
        <div
          className="login-brand"
          onClick={() => navigate("/")}
        >
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.U5LR7kR6TBoiXbVk1BVbzwHaG8?pid=Api&P=0&h=180"
            alt="logo"
          />
          <span>Book & Go</span>
        </div>

        {/* Heading */}
        <h2>Welcome Back</h2>
        <p className="subtitle">Explore the world with us</p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Button */}
        <button type="submit">Login</button>

        {/* Extra */}
        <p className="extra">
          New user?{" "}
          <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>

      </form>
    </div>
  );
}