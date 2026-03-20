import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: "http://localhost:5000/api/students",
});

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    parentName: "",
    contact: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.age || !form.parentName || !form.contact) {
      return toast.warning("Please fill all fields ⚠️");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      await api.post("/", formData, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Student added successfully 🎉", {
        position: "top-right",
      });

      navigate("/admin/students");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to add student ❌",
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 via-emerald-50 to-cyan-100 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-white/70 backdrop-blur-lg border border-white/30">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Student
        </h2>

        {/* Image Preview */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-400 shadow-md">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* File Input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4 text-sm file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-emerald-50 file:text-emerald-600
          hover:file:bg-emerald-100"
        />

        {/* Inputs */}
        {["name", "age", "parentName", "contact"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={
              field === "parentName"
                ? "Parent Name"
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            onChange={handleChange}
            className="w-full mb-3 px-4 py-2.5 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-emerald-400 focus:outline-none 
            transition shadow-sm"
          />
        ))}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600 active:scale-95"
          }`}
        >
          {loading ? "Saving..." : "Save Student"}
        </button>
      </div>
    </div>
  );
}