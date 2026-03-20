import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ FIX: fallback if env not set
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ENTER KEY */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      login();
    }
  }

  /* GOOGLE LOGIN */
  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      try {
        const res = await axios.post(
          `${API_URL}/api/users/google-login`,
          { token: response.access_token }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Login successful 🌱");

        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (e) {
        console.error(e);
        toast.error("Google Login Failed");
      }
    },
  });

  /* NORMAL LOGIN */
  async function login() {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Welcome back! 🌱");

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      console.error("LOGIN ERROR:", e.response || e);

      if (e.response?.status === 404) {
        toast.error("API route not found (check backend)");
      } else if (e.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login Failed");
      }
    }
  }

  return (
    <div className="w-full h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1588072432836-e10032774350"
          alt="Kids learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-4">
            🌱 UDAYA LAMAUYANA Montessori
          </h1>
          <p className="text-lg text-gray-200 max-w-md">
            A caring and joyful learning environment for your child’s bright future.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-blue-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue your journey
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-2">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* FORGOT */}
          <div className="text-right mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* LOGIN */}
          <button
            onClick={login}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          {/* GOOGLE */}
          <button
            onClick={googleLogin}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Login with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-gray-500 mt-6">
            New here?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}