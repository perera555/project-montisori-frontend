import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  UserIcon,
  PhoneIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

// ✅ FIXED: use backend from .env
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/teachers`,
});

export default function UpdateTeachers() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    experience: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const getTeacher = async () => {
    try {
      const res = await api.get(`/${id}`);
      const t = res.data;

      setForm({
        name: t.name || "",
        experience: t.experience || "",
        phone: t.phone || "",
      });
    } catch (err) {
      toast.error("Failed to load teacher ❌");
      navigate("/admin/teachers");
    }
  };

  useEffect(() => {
    if (id) getTeacher();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.put(`/${id}`, form);
      toast.success("Teacher updated successfully ✅");
      navigate("/admin/teachers");
    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 p-6 text-white">

      <div className="w-full max-w-lg 
      bg-white/10 backdrop-blur-2xl border border-white/20 
      shadow-2xl rounded-3xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Update Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div className="relative">
            <UserIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl 
              bg-white/10 border border-white/20 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 
              outline-none transition placeholder-transparent"
              placeholder="Name"
            />
            <label className="absolute left-10 top-3 text-gray-400 text-sm transition-all">
              Name
            </label>
          </div>

          {/* Experience */}
          <div className="relative">
            <BriefcaseIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl 
              bg-white/10 border border-white/20 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 
              outline-none transition placeholder-transparent"
              placeholder="Experience"
            />
            <label className="absolute left-10 top-3 text-gray-400 text-sm">
              Experience
            </label>
          </div>

          {/* Phone */}
          <div className="relative">
            <PhoneIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl 
              bg-white/10 border border-white/20 
              focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 
              outline-none transition placeholder-transparent"
              placeholder="Phone"
            />
            <label className="absolute left-10 top-3 text-gray-400 text-sm">
              Phone
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4 gap-4">

            <button
              type="button"
              onClick={() => navigate("/admin/teachers")}
              className="w-1/2 py-2.5 rounded-xl 
              bg-white/10 hover:bg-white/20 
              border border-white/20 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 py-2.5 rounded-xl 
              bg-gradient-to-r from-emerald-400 to-green-500 
              text-black font-semibold 
              hover:scale-105 transition 
              disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}