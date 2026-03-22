import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { uploadMultipleMedia } from "../../meadiaupload";

export default function AdminGallery() {
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [activityDetails, setActivityDetails] = useState([]);
  const [allGalleries, setAllGalleries] = useState([]);

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

  // ================= FETCH =================
  const fetchGallery = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery`
      );

      console.log("API DATA:", res.data); // ✅ DEBUG

      // ✅ FIX ERROR HERE
      if (Array.isArray(res.data)) {
        setAllGalleries(res.data);
      } else if (Array.isArray(res.data.galleries)) {
        setAllGalleries(res.data.galleries);
      } else {
        setAllGalleries([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ================= UPLOAD =================
  const onDropActivity = async (acceptedFiles) => {
    try {
      const urls = await uploadMultipleMedia(acceptedFiles);

      const now = new Date();

      setActivityDetails((prev) => [
        ...prev,
        ...urls.map((url) => ({
          url,
          title: "",
          description: "",
          uploadedAt: now.toISOString(),
        })),
      ]);

      toast.success("Images uploaded!");
    } catch {
      toast.error("Upload failed");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropActivity,
    accept: { "image/*": [] },
  });

  // ================= SAVE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) return toast.error("Select date");

    try {
      setSaving(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/gallery`, {
        year,
        month,
        activityImages: activityDetails,
      });

      toast.success("Saved!");
      setActivityDetails([]);
      setDate("");
      fetchGallery(); // refresh
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // ================= DELETE =================
  const deleteImage = async (galleryId, index) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/gallery/${galleryId}/image/${index}`
      );

      toast.success("Deleted");
      fetchGallery();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid md:grid-cols-2 gap-6">

      {/* LEFT */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-xl font-bold">Upload Gallery</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="w-full border p-2 rounded"
          />

          <div
            {...getRootProps()}
            className="border-2 border-dashed p-6 text-center rounded cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Upload Images</p>
          </div>

          {/* PREVIEW */}
          <div className="grid grid-cols-3 gap-3">
            {activityDetails.map((img, i) => (
              <img key={i} src={img.url} className="h-24 object-cover rounded" />
            ))}
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            {saving ? "Saving..." : "Save"}
          </button>

        </form>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold">All Gallery</h2>

        {Array.isArray(allGalleries) &&
          allGalleries.map((gallery) => (
            <div key={gallery._id} className="border-b pb-4">

              <h3 className="font-semibold text-gray-700">
                {gallery.month} {gallery.year}
              </h3>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {gallery.activityImages?.map((img, i) => (
                  <div key={i} className="relative">

                    <img
                      src={img.url}
                      className="h-24 w-full object-cover rounded"
                    />

                    <p className="text-[10px] text-gray-400">
                      {new Date(img.uploadedAt).toLocaleString()}
                    </p>

                    <button
                      onClick={() => deleteImage(gallery._id, i)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 rounded"
                    >
                      X
                    </button>

                  </div>
                ))}
              </div>

            </div>
          ))}
      </div>
    </div>
  );
}