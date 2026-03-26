import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Star, Moon, Sun } from "lucide-react";

const BASE_URL = "http://localhost:5000";

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(false);
  const [filter, setFilter] = useState(0);
  const [typingHint, setTypingHint] = useState("");

  const t = {
    title: lang === "en" ? "Parent Testimonials" : "මව්පිය අදහස්",
    name: lang === "en" ? "Your Name" : "ඔබගේ නම",
    message: lang === "en" ? "Your Review" : "ඔබගේ අදහස",
    submit: lang === "en" ? "Submit Review" : "යවන්න",
    empty: lang === "en" ? "No reviews yet" : "තවම අදහස් නොමැත",
    rating: lang === "en" ? "Your Rating" : "ඔබගේ ශ්‍රේණිය",
    filter: lang === "en" ? "Filter by rating" : "ශ්‍රේණියෙන් පෙරහන් කරන්න",
    helper:
      lang === "en"
        ? "Type Sinhala using your keyboard or try English words below"
        : "සිංහල ටයිප් කිරීමට Sinhala keyboard භාවිතා කරන්න හෝ English ටයිප් කර බලන්න"
  };

  const fetchReviews = async () => {
    const res = await axios.get(`${BASE_URL}/api/testimonials`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Sinhala suggestion helper
  const handleTyping = (value) => {
    setMessage(value);

    if (lang === "si") {
      const words = value.split(" ");
      const lastWord = words[words.length - 1];

      const map = {
        amma: "අම්මා",
        appa: "අප්පා",
        ayubowan: "ආයුබෝවන්",
        istuti: "ස්තූතියි",
        hari: "හරි",
      };

      setTypingHint(map[lastWord.toLowerCase()] || "");
    } else {
      setTypingHint("");
    }
  };

  const submitReview = async () => {
    if (!name || !message || rating === 0) return;

    await axios.post(`${BASE_URL}/api/testimonials`, {
      name,
      message,
      rating,
    });

    setName("");
    setMessage("");
    setRating(0);
    setTypingHint("");
    fetchReviews();
  };

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((a, b) => a + (b.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const renderStars = (count, clickable = false) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          onClick={() => clickable && setRating(i)}
          className={`w-5 h-5 cursor-pointer ${
            i <= count
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const filteredReviews = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews;

  return (
    <div
      className={`min-h-screen p-6 ${
        dark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-indigo-100 via-white to-blue-100"
      } ${lang === "si" ? "font-sinhala" : ""}`}
    >
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">{t.title}</h1>

        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setLang(lang === "en" ? "si" : "en")}
            className="px-4 py-1 bg-gray-200 rounded"
          >
            {lang === "en" ? "සිංහල" : "English"}
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded bg-gray-200"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Average */}
        <div className="mt-4 flex flex-col items-center">
          <p className="text-lg font-semibold">⭐ {avgRating} / 5</p>
          {renderStars(Math.round(avgRating))}
        </div>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto bg-white/80 dark:bg-gray-800 p-6 rounded-2xl shadow mb-10"
      >
        {lang === "si" && (
          <p className="text-sm text-gray-500 mb-3">{t.helper}</p>
        )}

        <input
          lang={lang === "si" ? "si" : "en"}
          placeholder={t.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 rounded border"
        />

        <textarea
          lang={lang === "si" ? "si" : "en"}
          placeholder={t.message}
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          className="w-full p-2 mb-2 rounded border"
        />

        {/* Sinhala suggestion */}
        {lang === "si" && typingHint && (
          <p className="text-sm text-blue-500 mb-3">
            Suggestion: {typingHint}
          </p>
        )}

        <div className="mb-3">
          {renderStars(rating, true)}
        </div>

        <button
          onClick={submitReview}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {t.submit}
        </button>
      </motion.div>

      {/* FILTER */}
      <div className="text-center mb-6">
        <p className="mb-2">{t.filter}</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => setFilter(i)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              {i}★
            </button>
          ))}
          <button onClick={() => setFilter(0)}>All</button>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredReviews.length === 0 && (
          <p className="text-center col-span-3">{t.empty}</p>
        )}

        {filteredReviews.map((r, index) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow"
          >
            <p className="font-bold">{r.name}</p>
            {renderStars(r.rating || 0)}
            <p className="italic mt-2">\"{r.message}\"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}