import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/assets/components/navbar";
import { Link } from "react-router-dom";

export default function HomePage({ lang, setLang }) {

  // ================= ANNOUNCEMENT STATE =================
  const [announcement, setAnnouncement] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API_URL = `${BASE_URL}/api/announcements`;

  // ================= FETCH ANNOUNCEMENT =================
  const fetchAnnouncement = async () => {
    try {
      const res = await axios.get(API_URL);

      // Adjust depending on your backend response
      const data = res.data?.list || res.data || [];

      if (Array.isArray(data) && data.length > 0) {
        setAnnouncement(data[0]); // show latest
      }
    } catch (err) {
      console.error("Announcement fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />

      <div className="pt-[80px]">

        {/* HERO SECTION */}
        <section className="relative text-white text-center py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {lang === "en"
                ? "🌱 UDAYA LAMAUYANA Montessori"
                : "🌱 උදය ලමා උයන මොන්ටිසෝරි"}
            </h1>

            <p className="text-lg md:text-xl text-gray-200">
              {lang === "en"
                ? "Guided and supported by Ven. Weraduwe Siri Jothi Thero."
                : "වෙන. වෙරදුවේ සිරි ජෝති හිමියන්ගේ මගපෙන්වීම යටතේ."}
            </p>
          </div>
        </section>

        {/* ================= ANNOUNCEMENT (DYNAMIC) ================= */}
        {announcement && (
          <section className="bg-gradient-to-r from-yellow-100 via-white to-yellow-100 py-10 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-md border border-yellow-200 shadow-xl rounded-2xl p-6 text-center relative overflow-hidden">

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-2xl"></div>

                <h2 className="text-2xl font-bold text-yellow-600 mb-3">
                  📢 {lang === "en" ? "Announcement" : "📢 නිවේදනය"}
                </h2>

                {/* TITLE */}
                {announcement.title && (
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {announcement.title}
                  </h3>
                )}

                {/* MESSAGE */}
                <p className="text-gray-700 text-lg leading-relaxed">
                  {announcement.message || announcement.description}
                </p>

                {/* OPTIONAL BUTTON */}
                <div className="mt-5">
                  <Link to="/contact">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-semibold transition">
                      {lang === "en"
                        ? "Contact Us"
                        : "අප අමතන්න"}
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* BENEFITS */}
        <section className="py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            {lang === "en"
              ? "🌟 Benefits for Your Child"
              : "🌟 ඔබේ දරුවාට ලැබෙන ප්‍රතිලාභ"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {(lang === "en"
              ? [
                  {
                    title: "🧘 Discipline & Values",
                    text: "Guidance inspired by Buddhist principles.",
                  },
                  {
                    title: "🧠 Early Education",
                    text: "Strong learning foundation.",
                  },
                  {
                    title: "🎨 Creativity",
                    text: "Build confidence and creativity.",
                  },
                ]
              : [
                  {
                    title: "🧘 විනය",
                    text: "හොඳ හැසිරීම් වර්ධනය.",
                  },
                  {
                    title: "🧠 අධ්‍යාපනය",
                    text: "ශක්තිමත් පදනමක්.",
                  },
                  {
                    title: "🎨 නිර්මාණශීලීත්වය",
                    text: "විශ්වාසය වර්ධනය.",
                  },
                ]
            ).map((item, i) => (
              <div key={i} className="bg-white shadow-lg p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16 px-6">
          <h2 className="text-3xl font-bold mb-4">
            {lang === "en"
              ? "Give Your Child a Bright Future 🌟"
              : "ඔබේ දරුවාට දීප්තිමත් අනාගතයක්"}
          </h2>

          <Link to="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold">
              {lang === "en" ? "Contact Us" : "අමතන්න"}
            </button>
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>© 2026 UDAYA LAMAUYANA Montessori</p>
        </footer>

      </div>
    </div>
  );
}