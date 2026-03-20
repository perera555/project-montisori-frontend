import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  /* ENTER KEY */
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      register();
    }
  }

  /* GOOGLE REGISTER */
  const googleRegister = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      try {
        const res = await axios.post(
          import.meta.env.VITE_API_URL + "/api/users/google-login",
          { token: response.access_token }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success("Registered successfully 🌱");

        const role = res.data.user.role;
        navigate(role === "admin" ? "/admin" : "/client");
      } catch (e) {
        toast.error("Google Register Failed");
      }
    },
  });

  /* REGISTER FUNCTION */
  async function register() {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/register",
        {
          name,
          email,
          password,
          role: "client", // default role
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Account created successfully 🎉");

      navigate("/client");
    } catch (e) {
      console.error(e);
      toast.error("Registration failed");
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
            🌱 Join UDAYA LAMAUYANA Montessori
          </h1>
          <p className="text-lg text-gray-200 max-w-md">
            Create an account and be part of a caring learning journey for your child.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-green-50 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
            Create Account 🌱
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Start your journey with us
          </p>

          {/* NAME */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

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

          {/* CONFIRM PASSWORD */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Confirm password"
            />
          </div>

          {/* REGISTER BUTTON */}
          <button
            onClick={register}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

          {/* GOOGLE REGISTER */}
          <button
            onClick={googleRegister}
            className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Register with Google
          </button>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}