import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/assets/components/navbar";

export default function ClientGallery() {
  const [gallery, setGallery] = useState([]);

  // ✅ SLIDER STATE
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API_URL = `${BASE_URL}/api/gallery`;

  // ================= FETCH =================
  const fetchGallery = async () => {
    try {
      const res = await axios.get(API_URL);

      const data = res.data.list || res.data || [];

      if (!Array.isArray(data)) return;

      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ================= SLIDER FUNCTIONS =================
  const openSlider = (images, index) => {
    setSelectedImages(images);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeSlider = () => setIsOpen(false);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  // ================= GROUP BY YEAR =================
  const grouped = (gallery || []).reduce((acc, item) => {
    if (!item?.year) return acc;
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 mt-[70px] max-w-6xl mx-auto">
        <h1 className="text-4xl text-center mb-10 font-bold">
          Gallery
        </h1>

        {/* EMPTY */}
        {Object.keys(grouped).length === 0 && (
          <p className="text-center text-gray-400">
            No gallery data found 😕
          </p>
        )}

        {Object.entries(grouped).map(([year, items]) => (
          <div key={year} className="mb-12">
            <h2 className="text-2xl mb-6 border-l-4 border-blue-500 pl-3 font-semibold">
              {year}
            </h2>

            {items.map((item, i) => (
              <div key={i} className="bg-white p-6 mb-8 rounded-xl shadow">

                {/* MONTH */}
                <h3 className="mb-4 font-medium text-lg">
                  {item.month}
                </h3>

                {/* ================= ACTIVITIES ================= */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-lg">
                    Activities
                  </h4>

                  <div className="grid md:grid-cols-3 gap-5">
                    {item.activityImages?.length > 0 ? (
                      item.activityImages.map((img, j) => {
                        const imageUrl = img.url.startsWith("http")
                          ? img.url
                          : `${BASE_URL}${img.url}`;

                        return (
                          <div
                            key={j}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                          >
                            {/* IMAGE */}
                            <img
                              src={imageUrl}
                              alt=""
                              onClick={() => openSlider(item.activityImages, j)}
                              className="h-44 w-full object-cover cursor-pointer"
                            />

                            {/* TEXT */}
                            <div className="p-3">
                              {img.title && (
                                <p className="font-semibold text-sm text-gray-800">
                                  {img.title}
                                </p>
                              )}

                              {img.description && (
                                <p className="text-xs text-gray-600 mt-1">
                                  {img.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-gray-400">No activity images</p>
                    )}
                  </div>
                </div>

                {/* ================= MOMENTS ================= */}
                <div>
                  <h4 className="font-semibold mb-4 text-lg">
                    Moments
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {item.conversationImages?.length > 0 ? (
                      item.conversationImages.map((img, j) => {
                        const imageUrl = img.url.startsWith("http")
                          ? img.url
                          : `${BASE_URL}${img.url}`;

                        return (
                          <img
                            key={j}
                            src={imageUrl}
                            alt=""
                            onClick={() =>
                              openSlider(item.conversationImages, j)
                            }
                            className="h-32 w-full object-cover rounded-lg shadow cursor-pointer"
                          />
                        );
                      })
                    ) : (
                      <p className="text-gray-400">No images</p>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ================= SLIDER MODAL ================= */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">

          {/* CLOSE */}
          <button
            onClick={closeSlider}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>

          {/* PREV */}
          <button
            onClick={prevSlide}
            className="absolute left-5 text-white text-4xl"
          >
            ❮
          </button>

          {/* IMAGE */}
          <img
            src={
              selectedImages[currentIndex]?.url?.startsWith("http")
                ? selectedImages[currentIndex].url
                : `${BASE_URL}${selectedImages[currentIndex]?.url}`
            }
            className="max-h-[80%] max-w-[90%] rounded-lg"
          />

          {/* NEXT */}
          <button
            onClick={nextSlide}
            className="absolute right-5 text-white text-4xl"
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
}