import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/assets/components/navbar";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/gallery");
      setGallery(res.data.list);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Group by year
  const grouped = gallery.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = [];
    acc[item.year].push(item);
    return acc;
  }, {});

  return (
    <div>
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main */}
      <div className="pt-[80px] min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            📸 Montessori Activities Gallery
          </h1>

          {/* Years */}
          {Object.keys(grouped)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year} className="mb-14">

                {/* Year */}
                <h2 className="text-3xl font-bold mb-8 text-gray-700 border-l-4 border-blue-500 pl-4">
                  {year}
                </h2>

                {/* Months */}
                {grouped[year].map((item, index) => (
                  <div
                    key={index}
                    className="mb-10 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                  >
                    {/* Month */}
                    <h3 className="text-xl font-semibold mb-6 text-blue-600">
                      📅 {item.month}
                    </h3>

                    {/* 🔥 Split Layout */}
                    <div className="grid md:grid-cols-2 gap-8">

                      {/* 🎨 Activities */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 text-gray-700">
                          🎨 Activities
                        </h4>

                        {item.activityImages && item.activityImages.length > 0 ? (
                          <div className="grid grid-cols-2 gap-4">
                            {item.activityImages.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="activity"
                                className="w-full h-40 object-cover rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-300"
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No activity images
                          </p>
                        )}
                      </div>

                      {/* 🗣️ Moments */}
                      <div>
                        <h4 className="text-lg font-bold mb-4 text-gray-700">
                          🗣️ Moments
                        </h4>

                        {item.conversationImages && item.conversationImages.length > 0 ? (
                          <div className="grid grid-cols-2 gap-4">
                            {item.conversationImages.map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt="moment"
                                className="w-full h-40 object-cover rounded-xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-300"
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 text-sm">
                            No conversation images
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ))}

        </div>
      </div>
    </div>
  );
}