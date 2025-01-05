import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helpers";
import axisoInstance from "../utils/axios";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token"); // Tokenni tekshirish
    if (token) {
      navigate("/dashboard"); // Agar token bo'lsa, dashboardga yo'naltirish
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    setError("");

    try {
      const response = await axisoInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);

        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 border rounded px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="email"
              placeholder="Email"
              className={`input-box ${error && !email ? "border-red-500" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${error && !password ? "border-red-500" : ""}`}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                className="font-medium text-primary underline"
                to={"/signup"}
              >
                Create An Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
