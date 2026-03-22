import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadMultipleMedia } from "../../meadiaupload";

export default function AdminGallery() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [activityDetails, setActivityDetails] = useState([]);
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
        setActivityDetails((prev) => [
          ...prev,
          ...urls.map((url) => ({
            url,
            title: "",
            description: "",
          })),
        ]);
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

  // ================= REMOVE =================
  const removeActivity = (index) => {
    const updated = [...activityDetails];
    updated.splice(index, 1);
    setActivityDetails(updated);
  };

  const removeConversation = (index) => {
    const updated = [...conversationImages];
    updated.splice(index, 1);
    setConversationImages(updated);
  };

  // ================= SAVE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!year || !month) return toast.error("Please select date");

    try {
      setSaving(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/gallery`, {
        year,
        month,
        activityImages: activityDetails, // ✅ includes title & description
        conversationImages, // ✅ images only
      });

      toast.success("Gallery saved!");

      // reset
      setActivityDetails([]);
      setConversationImages([]);
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-6">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Upload Gallery
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* DATE */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Select Month
            </label>
            <input
              type="month"
              className="border border-gray-300 rounded-lg p-2 w-full"
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

          {/* ================= ACTIVITY ================= */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Activity Images (with Title & Description)
            </label>

            <input
              type="file"
              multiple
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                handleMultipleUpload(e.target.files, "activity")
              }
            />

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {activityDetails.map((item, i) => (
                <div key={i} className="bg-gray-50 p-3 rounded-lg shadow-sm">

                  <img
                    src={item.url}
                    className="h-32 w-full object-cover rounded-md"
                  />

                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full mt-2 p-2 border rounded"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...activityDetails];
                      updated[i].title = e.target.value;
                      setActivityDetails(updated);
                    }}
                  />

                  <textarea
                    placeholder="Short Description"
                    className="w-full mt-2 p-2 border rounded"
                    rows="2"
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...activityDetails];
                      updated[i].description = e.target.value;
                      setActivityDetails(updated);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => removeActivity(i)}
                    className="mt-2 text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ================= CONVERSATION ================= */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Conversation Images (No Title)
            </label>

            <input
              type="file"
              multiple
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                handleMultipleUpload(e.target.files, "conversation")
              }
            />

            <div className="grid grid-cols-4 gap-3 mt-3">
              {conversationImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="h-20 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeConversation(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            {saving ? "Saving..." : "Save Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
}