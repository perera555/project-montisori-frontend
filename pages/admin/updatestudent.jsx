import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    parentName: "",
    contact: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // GET student
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // ✅ FIXED
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/students/${id}`
        );

        setForm({
          name: res.data.name || "",
          age: res.data.age || "",
          parentName: res.data.parentName || "",
          contact: res.data.contact || "",
          image: null,
        });

        if (res.data.image) {
          // ✅ FIXED
          setPreview(
            `${import.meta.env.VITE_API_URL}/uploads/${res.data.image}`
          );
        }
      } catch (err) {
        toast.error("Failed to load student ❌");
      }
    };

    fetchStudent();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setForm({ ...form, image: file });
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.parentName || !form.contact) {
      return toast.warning("Please fill all fields ⚠️");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      // ✅ FIXED
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/students/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Student updated successfully 🎉");

      navigate("/admin/students");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Update failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl border border-white/30 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Update Student
        </h2>

        {/* IMAGE PREVIEW */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
            {preview ? (
              <img
                src={preview}
                alt="student"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-600
          hover:file:bg-blue-100"
        />

        {/* INPUTS */}
        {[
          { name: "name", placeholder: "Name" },
          { name: "age", placeholder: "Age" },
          { name: "parentName", placeholder: "Parent Name" },
          { name: "contact", placeholder: "Contact" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-blue-400 focus:outline-none 
            transition shadow-sm"
          />
        ))}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transition-all duration-200
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Updating..." : "Update Student"}
        </button>
      </form>
    </div>
  );
}