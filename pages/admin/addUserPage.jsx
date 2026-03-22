import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/users`,
});

export default function AddUserPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password
    ) {
      return toast.warning("Please fill required fields ⚠️");
    }

    try {
      setLoading(true);

      await api.post("/", form, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      toast.success("User created successfully 🎉");
      navigate("/admin/users");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create user ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-green-50 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-2 rounded-lg shadow hover:bg-gray-100"
        >
          <IoArrowBack size={18} />
        </button>

        <h1 className="text-3xl font-bold text-green-700">
          Add User 👤
        </h1>
      </div>

      {/* FORM */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none col-span-1 sm:col-span-2"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none"
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-400 outline-none col-span-1 sm:col-span-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 active:scale-95"
          }`}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </div>
    </div>
  );
}