import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Phone, Briefcase } from "lucide-react";

const api = axios.create({
  baseURL: "http://localhost:5000/api/teachers",
});

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getTeachers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/");
      setTeachers(res.data.list || []);
    } catch (err) {
      toast.error("Failed to load teachers ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 p-6 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
          <h2 className="text-4xl font-bold tracking-tight">
            Teacher Management
          </h2>

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/teachers/add")}
              className="bg-gradient-to-r from-emerald-400 to-green-500 
              hover:scale-105 transition-transform 
              text-black font-semibold px-6 py-2.5 rounded-xl shadow-lg"
            >
              + Add Teacher
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-300 mt-16 animate-pulse">
            Loading teachers...
          </div>
        )}

        {/* Cards */}
        {!loading && teachers.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t) => (
              <div
                key={t._id}
                className="group relative p-6 rounded-3xl 
                bg-white/10 backdrop-blur-xl border border-white/20
                shadow-xl hover:shadow-emerald-500/20 
                transition-all duration-300 hover:-translate-y-2"
              >
                {/* ✅ FIXED: This no longer blocks clicks */}
                <div className="absolute inset-0 rounded-3xl opacity-0 
                group-hover:opacity-100 
                bg-gradient-to-r from-emerald-400/20 to-green-500/20 
                blur-xl transition pointer-events-none" />

                <h3 className="text-xl font-semibold mb-3">
                  {t.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-200">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    {t.experience}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {t.phone}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/teachers/update/${t._id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl 
                    bg-blue-500 hover:bg-blue-600 
                    transition active:scale-95 shadow-md"
                  >
                    <Pencil size={16} />
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && teachers.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-300">
            <p className="text-lg">No teachers found 😕</p>

            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin/teachers/add")}
                className="mt-5 px-6 py-2.5 rounded-xl 
                bg-emerald-400 text-black font-semibold 
                hover:scale-105 transition"
              >
                Add First Teacher
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}