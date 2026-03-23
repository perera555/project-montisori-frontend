import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/assets/components/navbar";
import { Link } from "react-router-dom";

export default function HomePage({ lang, setLang }) {

  const [announcement, setAnnouncement] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API_URL = `${BASE_URL}/api/announcements`;

  const fetchAnnouncement = async () => {
    try {
      const res = await axios.get(API_URL);

      let data = [];

      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data?.list)) data = res.data.list;
      else if (Array.isArray(res.data?.data)) data = res.data.data;

      if (data.length > 0) setAnnouncement(data[0]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />

      <div className="pt-[80px]">

        {/* HERO */}
        <section className="relative text-white text-center py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1588072432836-e10032774350" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {lang === "en"
                ? "🌱 UDAYA LAMAUYANA Montessori"
                : "🌱 උදය ලමා උයන මොන්ටිසෝරි"}
            </h1>
          </div>
        </section>

        {/* ANNOUNCEMENT */}
        {announcement && (
          <section className="py-12 px-6 bg-gradient-to-r from-yellow-50 via-white to-yellow-50">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border-l-8 border-yellow-400 shadow-2xl rounded-2xl p-8 text-center">

                <h2 className="text-3xl font-bold text-yellow-600 mb-3">
                  📢 {lang === "en" ? "Important Announcement" : "වැදගත් නිවේදනය"}
                </h2>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {announcement.title || "Latest Update"}
                </h3>

                <p className="text-gray-600 text-lg">
                  {announcement.message || announcement.description}
                </p>

              </div>
            </div>
          </section>
        )}

        {/* ================= 3D BENEFITS + PROGRAMS ================= */}
        <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

            {/* BENEFITS */}
            <div>
              <h2 className="text-4xl font-extrabold mb-10 text-gray-800">
                {lang === "en"
                  ? "🌟 Benefits for Your Child"
                  : "🌟 ඔබේ දරුවාට ලැබෙන ප්‍රතිලාභ"}
              </h2>

              <div className="space-y-6">
                {(lang === "en"
                  ? [
                      "Discipline & Values",
                      "Early Education Excellence",
                      "Creative Development",
                      "Loving Environment",
                      "Safety & Protection",
                      "Moral Guidance",
                    ]
                  : [
                      "විනය හා වටිනාකම්",
                      "මුල් අධ්‍යාපනය",
                      "නිර්මාණශීලී වර්ධනය",
                      "ආදරණීය පරිසරය",
                      "ආරක්ෂාව",
                      "නෙත්තික මගපෙන්වීම",
                    ]
                ).map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 flex items-center gap-4 border border-gray-100"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full font-bold shadow">
                      ✔
                    </div>
                    <span className="text-lg font-semibold text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PROGRAMS */}
            <div>
              <h2 className="text-4xl font-extrabold mb-10 text-gray-800">
                {lang === "en"
                  ? "🎓 Our Programs"
                  : "🎓 අපගේ වැඩසටහන්"}
              </h2>

              <div className="space-y-6">

                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 border border-gray-100">
                  <h3 className="text-green-600 text-xl font-bold mb-2">
                    {lang === "en"
                      ? "🌱 Early Exploration"
                      : "🌱 මුල් අත්දැකීම්"}
                  </h3>
                  <p className="text-gray-600">
                    {lang === "en"
                      ? "Hands-on learning through play and curiosity"
                      : "ක්‍රීඩා මඟින් ලෝකය හඳුනාගැනීම"}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 border border-gray-100">
                  <h3 className="text-blue-600 text-xl font-bold mb-2">
                    {lang === "en"
                      ? "🧠 Cognitive Development"
                      : "🧠 බුද්ධි වර්ධනය"}
                  </h3>
                  <p className="text-gray-600">
                    {lang === "en"
                      ? "Develop thinking and problem-solving skills"
                      : "ගැටලු විසඳීමේ හැකියාව වර්ධනය කිරීම"}
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition duration-300 border border-gray-100">
                  <h3 className="text-purple-600 text-xl font-bold mb-2">
                    {lang === "en"
                      ? "🎨 Creative Arts"
                      : "🎨 නිර්මාණශීලී කලාව"}
                  </h3>
                  <p className="text-gray-600">
                    {lang === "en"
                      ? "Art, music and storytelling activities"
                      : "කලා සහ සංගීත ක්‍රියාකාරකම්"}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* GALLERY */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            {lang === "en"
              ? "📸 Activities & Moments"
              : "📸 ක්‍රියාකාරකම් සහ මතක"}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9" className="h-40 w-full object-cover rounded-xl" />
            <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70" className="h-40 w-full object-cover rounded-xl" />
            <img src="https://images.unsplash.com/photo-1588072432836-e10032774350" className="h-40 w-full object-cover rounded-xl" />
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" className="h-40 w-full object-cover rounded-xl" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16 px-6">
          <h2 className="text-3xl font-bold mb-4">
            {lang === "en"
              ? "Give Your Child a Bright Future 🌟"
              : "ඔබේ දරුවාට දීප්තිමත් අනාගතයක් ලබාදෙන්න 🌟"}
          </h2>

          <Link to="/contact">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold">
              {lang === "en" ? "Contact Us" : "අප අමතන්න"}
            </button>
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>
            {lang === "en"
              ? "© 2026 UDAYA LAMAUYANA Montessori"
              : "© 2026 උදය ලමා උයන මොන්ටිසෝරි"}
          </p>
        </footer>

      </div>
    </div>
  );
}