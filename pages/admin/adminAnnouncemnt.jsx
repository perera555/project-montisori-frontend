import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });

  const API_URL = "http://localhost:5000/api/announcements";

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(API_URL);
      setAnnouncements(res.data.list);
    } catch (err) {
      toast.error("Failed to fetch announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      toast.success("Announcement added 🎉");
      setForm({ title: "", message: "" });
      fetchAnnouncements();
    } catch (err) {
      toast.error("Error saving announcement");
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Deleted successfully");
      fetchAnnouncements();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Toaster position="top-right" />

      <h2 className="text-2xl font-bold mb-4">Create Announcement</h2>

      {/* Form */}
      <div className="bg-white shadow-lg rounded-2xl p-5 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2"
          />

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-black text-white hover:opacity-90"
          >
            Add Announcement
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">All Announcements</h2>

      {/* List */}
      <div className="space-y-4">
        {announcements.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.message}</p>

              <div className="text-sm text-gray-400 mt-2">
                {new Date(item.date).toLocaleString()} | {item.createdBy}
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
