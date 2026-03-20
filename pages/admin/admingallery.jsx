import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadMultipleMedia } from "../../meadiaupload";

export default function AdminGallery() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [activityImages, setActivityImages] = useState([]);
  const [conversationImages, setConversationImages] = useState([]);
  const [saving, setSaving] = useState(false);

  // ================= UPLOAD =================
  const handleMultipleUpload = async (files, type) => {
    if (!files || files.length === 0) {
      return toast.error("No files selected");
    }

    try {
      const fileArray = Array.from(files);

      const validFiles = fileArray.filter((file) =>
        file.type.startsWith("image/")
      );

      const urls = await uploadMultipleMedia(validFiles);

      if (type === "activity") {
        setActivityImages((prev) =>
          Array.from(new Set([...prev, ...urls]))
        );
      } else {
        setConversationImages((prev) =>
          Array.from(new Set([...prev, ...urls]))
        );
      }

      toast.success("Images uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  // ================= SAVE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!year || !month) return toast.error("Please select date");

    try {
      setSaving(true);

      await axios.post("http://localhost:5000/api/gallery", {
        year,
        month,
        activityImages,
        conversationImages,
      });

      toast.success("Gallery saved!");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg space-y-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Upload Gallery
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* DATE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Select Month
            </label>
            <input
              type="month"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) => {
                const [y, m] = e.target.value.split("-");
                setYear(y);
                setMonth(
                  new Date(y, m - 1).toLocaleString("default", {
                    month: "long",
                  })
                );
              }}
            />
          </div>

          {/* ACTIVITY UPLOAD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Activity Images
            </label>
            <input
              type="file"
              multiple
              className="w-full border p-2 rounded-lg cursor-pointer"
              onChange={(e) =>
                handleMultipleUpload(e.target.files, "activity")
              }
            />

            <div className="grid grid-cols-4 gap-2 mt-3">
              {activityImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-20 w-full object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>

          {/* CONVERSATION UPLOAD */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Conversation Images
            </label>
            <input
              type="file"
              multiple
              className="w-full border p-2 rounded-lg cursor-pointer"
              onChange={(e) =>
                handleMultipleUpload(e.target.files, "conversation")
              }
            />

            <div className="grid grid-cols-4 gap-2 mt-3">
              {conversationImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-20 w-full object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-2 rounded-lg shadow"
          >
            {saving ? "Saving..." : "Save Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
}