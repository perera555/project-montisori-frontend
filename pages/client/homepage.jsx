import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../src/assets/components/navbar";
import { Link } from "react-router-dom";

export default function HomePage({ lang, setLang }) {

  const [announcement, setAnnouncement] = useState(null);
  const [specialEvents, setSpecialEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // ✅ slider

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

  const fetchGalleryImages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/gallery`);
      let data = [];
      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data.galleries)) data = res.data.galleries;
      const images = data.flatMap(g => g.activityImages || []);
      setSpecialEvents(images);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
    fetchGalleryImages();
  }, []);

  // ✅ AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev === 3 ? 0 : prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
    "https://images.unsplash.com/photo-1588072432836-e10032774350",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
  ];

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />

      <div className="pt-[80px]">

        {/* HERO */}
        <section className="relative text-white text-center py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img src={galleryImages[2]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {lang === "en"
                ? "🌱 UDAYA LAMAUYANA Pre School"
                : "🌱 උදය ලමා උයන පෙර පාසල"}
            </h1>
          </div>
        </section>

        {/* ================= 4 COLUMN ================= */}
        <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

            {/* ⭐ PRINCIPAL BENEFITS */}
            <div className="bg-yellow-50 p-6 rounded-2xl shadow-2xl border-4 border-yellow-400 transform hover:-translate-y-3 hover:rotate-1 transition duration-300">
              <h2 className="text-3xl font-extrabold mb-6 text-yellow-700 text-center">
                ⭐ {lang==="en"?"Principal Benefits":"ප්‍රධාන ප්‍රතිලාභ"}
              </h2>

              <img src={galleryImages[3]} className="rounded-xl mb-4"/>

              <div className="space-y-4 text-sm leading-relaxed">
                {(lang==="en"?[
                  "There is no admission fee required to enroll your child in our preschool.",
                  "Free school uniforms are provided to every child.",
                  "All essential school books are given completely free of charge.",
                  "Nutritious meals are provided free of charge on selected days.",
                  "Educational trips and outdoor learning activities are organized regularly.",
                  "Every child receives a special birthday gift from the school.",
                  "A complete set of books and a school bag are provided in the first year.",
                  "Special benefits and celebrations are arranged for Children’s Day.",
                  "Each child receives a savings benefit of Rs.1000 at the end of the year."
                ]:[
                  "දරුවා ඇතුළත් කිරීම සඳහා කිසිදු ගාස්තුවක් අය නොකෙරේ.",
                  "සෑම දරුවෙකුටම නිල ඇඳුම් නොමිලේ ලබා දේ.",
                  "පාසල් පොත් සියල්ලම නොමිලේ සපයනු ලැබේ.",
                  "පෝෂණීය ආහාර නියමිත දිනවල නොමිලේ ලබා දේ.",
                  "අධ්‍යාපන චාරිකා සහ බාහිර ක්‍රියාකාරකම් සංවිධානය කරයි.",
                  "සෑම දරුවෙකුටම උපන්දිනයට විශේෂ තෑග්ගක් ලබා දේ.",
                  "පළමු වසර සඳහා පොත් සහ පාසල් බෑගයක් ලබා දේ.",
                  "ළමා දිනයට විශේෂ වැඩසටහන් සකස් කරයි.",
                  "වසර අවසානයේ රු.1000 ඉතිරිකිරීමක් ලබා දේ."
                ]).map((item,i)=>(
                  <div key={i} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition">
                    ✔ {item}
                  </div>
                ))}
              </div>
            </div>

            {/* PROGRAMS */}
            <div className="text-center bg-white p-6 rounded-2xl shadow-xl transform hover:-translate-y-3 hover:-rotate-1 transition duration-300">
              <h2 className="text-3xl font-extrabold mb-6 text-blue-700">
                🎓 {lang==="en"?"Programs":"වැඩසටහන්"}
              </h2>

              <img src={galleryImages[1]} className="rounded-xl mb-4"/>

              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                  {lang==="en"?"Learning through play activities":"ක්‍රීඩා මඟින් ඉගෙනීම"}
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                  {lang==="en"?"Developing thinking and problem-solving skills":"සිතීමේ හැකියාව වර්ධනය කිරීම"}
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
                  {lang==="en"?"Creative arts, music and storytelling":"නිර්මාණශීලී කලාව සහ සංගීතය"}
                </div>
              </div>
            </div>

            {/* BENEFITS */}
            <div className="bg-white p-6 rounded-2xl shadow-xl transform hover:-translate-y-3 hover:rotate-1 transition duration-300">
              <h2 className="text-3xl font-extrabold mb-6 text-green-700">
                🌟 {lang==="en"?"Benefits":"ප්‍රතිලාභ"}
              </h2>

              <img src={galleryImages[0]} className="rounded-xl mb-4"/>

              <div className="space-y-4">
                {(lang==="en"?[
                  "Children develop discipline and good behavior.",
                  "Creativity and imagination are enhanced.",
                  "Early education builds a strong foundation.",
                  "Safe and caring learning environment is ensured."
                ]:[
                  "දරුවන්ට විනය සහ හොඳ හැසිරීම වර්ධනය වේ.",
                  "නිර්මාණශීලීත්වය වර්ධනය වේ.",
                  "මුල් අධ්‍යාපනය ශක්තිමත් පදනමක් සපයයි.",
                  "ආරක්ෂිත පරිසරයක් ලබා දේ."
                ]).map((item,i)=>(
                  <div key={i} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition">
                    ✔ {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ANNOUNCEMENT */}
            <div className="bg-red-50 p-6 rounded-2xl shadow-2xl border-4 border-red-400 transform hover:-translate-y-3 hover:-rotate-1 transition duration-300">
              <h2 className="text-3xl font-extrabold mb-6 text-red-700 text-center">
                📢 {lang==="en"?"Announcement":"නිවේදනය"}
              </h2>

              <img src={galleryImages[2]} className="rounded-xl mb-4"/>

              <div className="bg-white p-4 rounded-xl shadow text-center">
                {announcement ? announcement.message : "No announcements"}
              </div>
            </div>

          </div>
        </section>

        {/* SPECIAL EVENTS (PRO SLIDER) */}
        <section className="py-20 px-6 bg-yellow-50">
          <h2 className="text-3xl font-bold text-center mb-10">
            🎉 {lang==="en"?"Special Events":"විශේෂ අවස්ථා"}
          </h2>

          <div className="relative max-w-6xl mx-auto">

            <button onClick={()=>setCurrentIndex(prev=>prev===0?3:prev-1)}
              className="absolute left-0 top-1/2 bg-white p-3 rounded-full shadow z-10">◀</button>

            <button onClick={()=>setCurrentIndex(prev=>prev===3?0:prev+1)}
              className="absolute right-0 top-1/2 bg-white p-3 rounded-full shadow z-10">▶</button>

            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 260}px)` }}>

                {(specialEvents.length > 0 ? specialEvents.slice(-4) : galleryImages).map((img,i)=>(
                  <div key={i}
                    className="min-w-[250px] mx-2 bg-white rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition cursor-pointer"
                    onClick={()=>setSelectedImage(img.url || img)}>
                    <img src={img.url || img} className="h-40 w-full object-cover rounded-t-xl"/>
                    <div className="p-3 text-center font-semibold">Event {i+1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              <Link to="/gallery">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">
                  View Full Gallery
                </button>
              </Link>
            </div>

          </div>

          {selectedImage && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={()=>setSelectedImage(null)}>
              <img src={selectedImage} className="max-h-[90%] max-w-[90%] rounded-xl"/>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16">
          <h2 className="text-3xl font-bold mb-4">
            {lang==="en"?"Bright Future 🌟":"දීප්තිමත් අනාගතයක් 🌟"}
          </h2>
          <Link to="/contact">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full shadow hover:scale-105 transition">
              {lang==="en"?"Contact":"අමතන්න"}
            </button>
          </Link>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-8">
          {lang==="en"
            ? "© 2026 UDAYA LAMAUYANA Pre School"
            : "© 2026 උදය ලමා උයන පෙර පාසල"}
        </footer>

      </div>
    </div>
  );
}