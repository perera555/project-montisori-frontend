import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/students`,
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
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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

      toast.success("Student added successfully 🎉");
      navigate("/admin/students");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to add student ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-white p-2 rounded-lg shadow hover:bg-gray-100"
        >
          <IoArrowBack size={18} />
        </button>

        <h1 className="text-3xl font-bold text-blue-700">
          Add Student 🎓
        </h1>
      </div>

      {/* FORM CARD */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
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

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-4 text-sm file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-600
            hover:file:bg-blue-100"
          />
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Student Name"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            name="parentName"
            placeholder="Parent Name"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        >
          {loading ? "Saving..." : "Save Student"}
        </button>
      </div>
    </div>
  );
}