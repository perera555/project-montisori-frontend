import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/assets/components/navbar";

export default function ClientGallery() {
  const [gallery, setGallery] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API_URL = `${BASE_URL}/api/gallery`;

  // ================= FETCH =================
  const fetchGallery = async () => {
    try {
      const res = await axios.get(API_URL);

      console.log("Gallery Data:", res.data); // ✅ DEBUG

      const data = res.data.list || res.data || [];

      if (!Array.isArray(data)) {
        console.error("Invalid data format");
        return;
      }

      setGallery(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

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
                              className="h-44 w-full object-cover"
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
                            className="h-32 w-full object-cover rounded-lg shadow"
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
    </div>
  );
}