import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import MediaUploadPage from "../../meadiaupload";

export default function AdminGallery() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [activityImages, setActivityImages] = useState([]);
  const [conversationImages, setConversationImages] = useState([]);

  const [uploading, setUploading] = useState(false);

  // 🔹 Upload handler (reusable)
  const handleFileUpload = async (file, type) => {
    if (!file) {
      toast.error("No file selected");
      return;
    }

    try {
      setUploading(true);

      const url = await MediaUploadPage(file);

      if (type === "activity") {
        setActivityImages((prev) => [...prev, url]);
      } else {
        setConversationImages((prev) => [...prev, url]);
      }

      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!year || !month || (activityImages.length === 0 && conversationImages.length === 0)) {
      toast.error("Fill all fields and upload images");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/gallery",
        {
          year,
          month,
          activityImages,
          conversationImages,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_TOKEN_HERE",
          },
        }
      );

      toast.success("Gallery uploaded!");

      setYear("");
      setMonth("");
      setActivityImages([]);
      setConversationImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading gallery");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-lg">

        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          📸 Upload Gallery
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
          />

          {/* 🎨 ACTIVITY UPLOAD */}
          <div>
            <p className="font-semibold mb-2">🎨 Activity Images</p>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e.target.files[0], "activity")}
              className="w-full p-2 border rounded-xl"
            />

            <div className="grid grid-cols-3 gap-2 mt-2">
              {activityImages.map((img, i) => (
                <img key={i} src={img} className="h-20 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* 🗣️ CONVERSATION UPLOAD */}
          <div>
            <p className="font-semibold mb-2">🗣️ Conversation Images</p>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e.target.files[0], "conversation")}
              className="w-full p-2 border rounded-xl"
            />

            <div className="grid grid-cols-3 gap-2 mt-2">
              {conversationImages.map((img, i) => (
                <img key={i} src={img} className="h-20 object-cover rounded" />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            🚀 Submit Gallery
          </button>

        </form>
      </div>
    </div>
  );
}