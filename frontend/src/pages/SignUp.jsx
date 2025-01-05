import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import axisoInstance from "../utils/axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Token mavjudligini tekshirish
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Agar token bo'lsa, dashboardga yo'naltirish
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Formani tekshirish
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!email) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError(""); // Oldingi xatoliklarni tozalash

    try {
      // API orqali hisob yaratish
      const response = await axisoInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message); // Backend xatolik xabarini ko'rsatish
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard"); // Dashboard sahifasiga yo'naltirish
        return;
      }
    } catch (error) {
      // Kutilmagan xatoliklar
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Backenddan kelgan xato xabarini ko'rsatish
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Input maydonlarini o'zgartirishda xatolikni tozalash
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setError(null); // Xatolikni tozalash
  };

  return (
    <div className="flex justify-center items-center mt-28">
      <div className="w-96 border rounded px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          {/* Name input field */}
          <input
            type="text"
            placeholder="Your Name"
            className={`input-box ${error && !name ? "border-red-500" : ""}`}
            value={name}
            onChange={(e) => handleInputChange(e, setName)}
          />

          {/* Email input field */}
          <input
            type="email"
            placeholder="Your Email"
            className={`input-box ${error && !email ? "border-red-500" : ""}`}
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />

          {/* Password input field */}
          <PasswordInput
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            className={`${error && !password ? "border-red-500" : ""}`}
          />

          {/* Error message */}
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          {/* Submit button */}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          {/* Link to login page if the user already has an account */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
