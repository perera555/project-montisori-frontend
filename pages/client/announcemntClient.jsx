import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Navbar from "../../src/assets/components/navbar";

export default function AnnouncementClient() {
  const [announcements, setAnnouncements] = useState([]);
  const [lang, setLang] = useState("en");

  const API_URL = "http://localhost:5000/api/announcements";

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(API_URL);
      setAnnouncements(res.data.list);
    } catch (err) {
      toast.error("Failed to load announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // 🌐 TRANSLATIONS
  const text = {
    en: {
      title: "📢 Announcements",
      subtitle: "Stay updated with the latest news",
      empty: "No announcements available",
      new: "NEW",
    },
    si: {
      title: "📢 නිවේදන",
      subtitle: "නවතම තොරතුරු සමඟ යාවත්කාලීනව සිටින්න",
      empty: "කිසිදු නිවේදනයක් නොමැත",
      new: "නව",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100">
      
      {/* ✅ NAVBAR WITH LANGUAGE */}
      <Navbar lang={lang} setLang={setLang} />

      <div className="py-10 px-4 mt-[70px]">
        <Toaster position="top-right" richColors />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {text[lang].title}
            </h2>
            <p className="text-gray-500 mt-2">
              {text[lang].subtitle}
            </p>
          </div>

          {/* Empty State */}
          {announcements.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">
                {text[lang].empty}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((item, index) => {
                const isNew =
                  new Date() - new Date(item.date) < 24 * 60 * 60 * 1000;

                return (
                  <div
                    key={item._id}
                    className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-xl transition duration-300"
                  >
                    {/* NEW Badge */}
                    {isNew && (
                      <span className="absolute top-3 right-3 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                        {text[lang].new}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    {/* Message */}
                    <p className="text-gray-600 mt-2 leading-relaxed">
                      {item.message}
                    </p>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                      <span>
                        {new Date(item.date).toLocaleString()}
                      </span>

                      <span className="italic">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}