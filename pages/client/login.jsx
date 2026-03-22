import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      login();
    }
  }

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

        setUser(res.data.user); // ✅ FIXED

        toast.success("Login successful 🌱");

        navigate(res.data.user.role === "admin" ? "/admin" : "/");
      } catch (e) {
        toast.error("Google Login Failed");
      }
    },
  });

  async function login() {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user); // ✅ FIXED

      toast.success("Welcome back! 🌱");

      navigate(response.data.user.role === "admin" ? "/admin" : "/");
    } catch (e) {
      if (!e.response) {
        toast.error("Server not reachable 🚫");
      } else if (e.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Login Failed ❌");
      }
    }
  }

  return (
    <div className="w-full h-screen flex">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
          alt="Kids learning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-4">
            🌱 Welcome Back
          </h1>
          <p className="text-lg text-gray-200 max-w-md">
            Login to continue your child’s learning journey with us.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-green-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
            Login 🌱
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Welcome back!
          </p>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={login}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>

          {/* GOOGLE LOGIN */}
          <button
            onClick={() => googleLogin()}
            className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Continue with Google
          </button>

          {/* REGISTER LINK */}
          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}