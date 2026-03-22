import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../../src/assets/components/navbar";

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const isAdmin = user?.role === "admin";

  // ✅ SAFE API URL
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API_URL = `${BASE_URL}/api/gallery`;

  const fetchGallery = async () => {
    try {
      console.log("Fetching from:", API_URL);

      const res = await axios.get(API_URL);

      console.log("API Response:", res.data);

      // ✅ Handle both formats
      const data = res.data.list || res.data || [];

      if (!Array.isArray(data)) {
        console.error("Invalid data format");
        return;
      }

      setGallery(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load ❌");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const deleteImage = async (year, month, image, type) => {
    if (!isAdmin) return toast.error("Only admin 🚫");

    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`${API_URL}/image`, {
        data: { year, month, image, type },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Deleted ✅");
      fetchGallery();
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed ❌");
    }
  };

  // ✅ GROUP BY YEAR SAFELY
  const grouped = (gallery || []).reduce((acc, item) => {
    if (!item?.year) return acc;
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});

  const openSlider = (images, index) => {
    setSelectedImages(images);
    setCurrentIndex(index);
    setShowModal(true);
  };

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % selectedImages.length);

  const prevSlide = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 mt-[70px]">
        <Toaster position="top-right" />

        <div className="max-w-6xl mx-auto">
          {isAdmin && (
            <div className="text-center mb-4">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full">
                Admin Mode
              </span>
            </div>
          )}

          <h1 className="text-4xl text-center mb-10 font-bold">Gallery</h1>

          {/* ✅ EMPTY STATE */}
          {Object.keys(grouped).length === 0 && (
            <p className="text-center text-gray-400">
              No gallery data found 😕
            </p>
          )}

          {Object.entries(grouped).map(([year, items]) => (
            <div key={year} className="mb-10">
              <h2 className="text-2xl mb-4 border-l-4 border-blue-500 pl-3">
                {year}
              </h2>

              {items.map((item, i) => (
                <div key={i} className="bg-white p-6 mb-6 rounded-xl shadow">
                  <h3 className="mb-4 font-medium">{item.month}</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <ImageSection
                      title="Activities"
                      images={item.activityImages}
                      year={item.year}
                      month={item.month}
                      type="activity"
                      isAdmin={isAdmin}
                      deleteImage={deleteImage}
                      openSlider={openSlider}
                      BASE_URL={BASE_URL}
                    />

                    <ImageSection
                      title="Moments"
                      images={item.conversationImages}
                      year={item.year}
                      month={item.month}
                      type="conversation"
                      isAdmin={isAdmin}
                      deleteImage={deleteImage}
                      openSlider={openSlider}
                      BASE_URL={BASE_URL}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ✅ MODAL */}
        {showModal && selectedImages.length > 0 && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-white text-3xl"
            >
              ✕
            </button>

            <button
              onClick={prevSlide}
              className="absolute left-5 text-white text-4xl"
            >
              ◀
            </button>

            <img
              src={selectedImages[currentIndex]}
              alt=""
              className="max-h-[80%] max-w-[90%] rounded-lg"
            />

            <button
              onClick={nextSlide}
              className="absolute right-5 text-white text-4xl"
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* IMAGE SECTION */
function ImageSection({
  title,
  images,
  year,
  month,
  type,
  isAdmin,
  deleteImage,
  openSlider,
  BASE_URL,
}) {
  const sorted = [...(images || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <p className="font-semibold mb-3 text-lg">{title}</p>

      <div className="grid grid-cols-2 gap-4">
        {sorted.length > 0 ? (
          sorted.map((img, idx) => {
            // ✅ FIX IMAGE URL
            const imageUrl = img.url.startsWith("http")
              ? img.url
              : `${BASE_URL}${img.url}`;

            return (
              <div
                key={idx}
                className="relative group rounded-xl overflow-hidden shadow"
              >
                <motion.img
                  src={imageUrl}
                  onClick={() =>
                    openSlider(sorted.map((i) => i.url), idx)
                  }
                  whileHover={{ scale: 1.08 }}
                  className="h-48 w-full object-cover cursor-pointer"
                />

                <div className="absolute bottom-2 left-2 text-white text-xs bg-black/60 px-2 py-1 rounded">
                  {new Date(img.createdAt).toLocaleString()}
                </div>

                {isAdmin && (
                  <button
                    onClick={() =>
                      deleteImage(year, month, img.url, type)
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">No images</p>
        )}
      </div>
    </div>
  );
}