import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { Reorder } from "framer-motion";
import { uploadMultipleMedia } from "../../meadiaupload";

export default function AdminGallery() {
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [activityDetails, setActivityDetails] = useState([]);
  const [conversationImages, setConversationImages] = useState([]);

  const [previewImage, setPreviewImage] = useState(null);
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

  // ================= DRAG DROP =================
  const onDropActivity = async (acceptedFiles) => {
    try {
      const urls = await uploadMultipleMedia(acceptedFiles);

      setActivityDetails((prev) => [
        ...prev,
        ...urls.map((url) => ({
          url,
          title: "",
          description: "",
        })),
      ]);

      toast.success("Uploaded!");
    } catch {
      toast.error("Upload failed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropActivity,
    accept: { "image/*": [] },
  });

  // ================= REMOVE =================
  const removeActivity = (index) => {
    const updated = [...activityDetails];
    updated.splice(index, 1);
    setActivityDetails(updated);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) return toast.error("Select date");

    try {
      setSaving(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/gallery`, {
        year,
        month,
        activityImages: activityDetails,
        conversationImages,
      });

      toast.success("Saved!");
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
      <div className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-lg space-y-10">

        <h2 className="text-3xl font-bold text-center">
          Gallery Manager
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* DATE */}
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="w-full border p-3 rounded-lg"
          />

          {/* ================= DRAG DROP ================= */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed p-8 text-center rounded-xl cursor-pointer hover:border-blue-400"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">
              Drag & drop images OR click to upload
            </p>
          </div>

          {/* ================= DRAG SORT ================= */}
          <Reorder.Group
            axis="y"
            values={activityDetails}
            onReorder={setActivityDetails}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activityDetails.map((item, i) => (
              <Reorder.Item
                key={item.url}
                value={item}
                className="bg-white border p-4 rounded-xl shadow"
              >
                {/* IMAGE */}
                <img
                  src={item.url}
                  className="h-40 w-full object-cover rounded-lg cursor-pointer"
                  onClick={() => setPreviewImage(item.url)}
                />

                {/* TITLE */}
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full mt-3 p-2 border rounded"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...activityDetails];
                    updated[i].title = e.target.value;
                    setActivityDetails(updated);
                  }}
                />

                {/* DESCRIPTION + LIMIT */}
                <textarea
                  maxLength={120}
                  placeholder="Description (max 120 chars)"
                  className="w-full mt-2 p-2 border rounded"
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...activityDetails];
                    updated[i].description = e.target.value;
                    setActivityDetails(updated);
                  }}
                />
                <p className="text-xs text-gray-400 text-right">
                  {item.description.length}/120
                </p>

                {/* REMOVE */}
                <button
                  type="button"
                  onClick={() => removeActivity(i)}
                  className="text-red-500 mt-2 text-sm"
                >
                  Remove
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          {/* SUBMIT */}
          <button className="w-full bg-blue-500 text-white py-3 rounded-lg">
            {saving ? "Saving..." : "Save"}
          </button>

        </form>
      </div>

      {/* ================= IMAGE MODAL ================= */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            className="max-h-[80vh] rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  );
}