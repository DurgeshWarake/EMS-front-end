import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const { login,user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/");
      else {
        navigate("/employee-dashboard");
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ems-apis-dwarake627-gmailcoms-projects.vercel.app/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      style={{
        background: "linear-gradient(to bottom, #4CAF50 50%, #FFFFFF 50%)",
      }}
    >
      <h2
        className="text-2xl mb-6 font-specific text-white"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        Login Employee Management System
      </h2>{" "}
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Form styled with background, padding, rounded corners, shadow, and max width [8] */}
        <div className="mb-4 space-y-6">
          {" "}
          {/* Container for input fields with vertical space between them [8] */}
          <div className="w-full">
            {" "}
            {/* Container for the email input group, full width [8] */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email {/* Label for email input [7] */}
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" // Input styling: shadow, border, rounded, full width, padding, text colour, focus styles [8]
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            {" "}
            {/* Container for the password input group, full width [8] */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password {/* Label for password input [7] */}
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" // Input styling: shadow, border, rounded, full width, padding, text colour, bottom margin, focus styles [8]
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {/* Section for "Remember me" checkbox and "Forgot password" link (described as simple HTML) [8] */}
        <div className="flex items-center justify-between mb-6 text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
            />
            <label htmlFor="remember-me" className="text-gray-700">
              Remember me
            </label>{" "}
            {/* Label for checkbox [8] */}
          </div>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>{" "}
          {/* Forgot password link [8] */}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" // Button styling: background, hover, text colour, font weight, padding, rounded corners, focus styles, full width [8]
          >
            Login {/* Button text [7] */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login; // Exports the Login component
