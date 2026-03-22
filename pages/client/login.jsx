import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ FIXED (removed localhost fallback)
  const API_URL = import.meta.env.VITE_API_URL;

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
      {/* SAME UI — NO CHANGES */}
    </div>
  );
}