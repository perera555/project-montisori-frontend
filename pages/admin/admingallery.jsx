import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadMultipleMedia } from "../../meadiaupload";

export default function AdminGallery() {
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [activityDetails, setActivityDetails] = useState([]);
  const [conversationImages, setConversationImages] = useState([]);

  const [saving, setSaving] = useState(false);

  // ================= DATE =================
  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);

    const [y, m] = value.split("-");
    setYear(y);
    setMonth(
      new Date(y, m - 1).toLocaleString("default", {
        month: "long",
      })
    );
  };

  // ================= UPLOAD =================
  const handleUpload = async (files, type) => {
    if (!files || files.length === 0) {
      return toast.error("No files selected");
    }

    try {
      const validFiles = Array.from(files).filter((file) =>
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
        setConversationImages((prev) => [...prev, ...urls]);
      }

      toast.success("Images uploaded!");
    } catch {
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

    if (!date) return toast.error("Please select date");

    try {
      setSaving(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/gallery`, {
        year,
        month,
        activityImages: activityDetails,
        conversationImages,
      });

      toast.success("Gallery saved!");

      // reset
      setActivityDetails([]);
      setConversationImages([]);
      setDate("");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-lg space-y-8">

        <h2 className="text-2xl font-bold text-center">
          Upload Monthly Activities
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= DATE ================= */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* ================= ACTIVITY ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Activities (Title + Description)
            </h3>

            <input
              type="file"
              multiple
              className="w-full border p-2 rounded-lg"
              onChange={(e) => handleUpload(e.target.files, "activity")}
            />

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              {activityDetails.map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <img
                    src={item.url}
                    className="h-36 w-full object-cover rounded-lg"
                  />

                  <input
                    type="text"
                    placeholder="Activity Title"
                    className="w-full mt-3 p-2 border rounded-lg"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...activityDetails];
                      updated[i].title = e.target.value;
                      setActivityDetails(updated);
                    }}
                  />

                  <textarea
                    placeholder="Short Description"
                    rows="2"
                    className="w-full mt-2 p-2 border rounded-lg"
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
            <h3 className="text-lg font-semibold mb-3">
              Conversation Images
            </h3>

            <input
              type="file"
              multiple
              className="w-full border p-2 rounded-lg"
              onChange={(e) =>
                handleUpload(e.target.files, "conversation")
              }
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {conversationImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="h-24 w-full object-cover rounded-lg"
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

          {/* ================= SUBMIT ================= */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            {saving ? "Saving..." : "Save Gallery"}
          </button>

        </form>
      </div>
    </div>
  );
}