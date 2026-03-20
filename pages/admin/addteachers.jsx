import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTeacher() {
  const [form, setForm] = useState({
    name: "",
    experience: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.experience || !form.phone) {
      return toast.warning("Please fill all fields ⚠️");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/teachers", form);

      toast.success("Teacher added successfully 🎉", {
        position: "top-right",
      });

      navigate("/admin/teachers");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to add teacher ❌",
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-green-50 to-emerald-100">
      
      <div className="w-full max-w-lg p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/30">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Name
            </label>
            <input
              name="name"
              placeholder="Enter teacher name"
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none 
              transition shadow-sm"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Experience
            </label>
            <input
              name="experience"
              placeholder="Years of experience"
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none 
              transition shadow-sm"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Phone
            </label>
            <input
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-emerald-400 focus:outline-none 
              transition shadow-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            
            <button
              type="button"
              onClick={() => navigate("/admin/teachers")}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2.5 rounded-xl text-white font-semibold shadow-md transition-all duration-200
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 active:scale-95"
              }`}
            >
              {loading ? "Saving..." : "Save Teacher"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}