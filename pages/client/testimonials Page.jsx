import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function Testimonials() {

  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState("en");

  const t = {
    title: lang === "en" ? "Parent Testimonials" : "මව්පිය අදහස්",
    name: lang === "en" ? "Your Name" : "ඔබගේ නම",
    message: lang === "en" ? "Your Review" : "ඔබගේ අදහස",
    submit: lang === "en" ? "Submit Review" : "යවන්න",
    empty: lang === "en" ? "No reviews yet" : "තවම අදහස් නොමැත",
    alert: lang === "en"
      ? "Please fill all fields"
      : "කරුණාකර සියලුම තොරතුරු ඇතුළත් කරන්න",
    success: lang === "en"
      ? "Review submitted ✅"
      : "අදහස සාර්ථකව යවන ලදී ✅"
  };

  const fetchReviews = async () => {
    const res = await axios.get(`${BASE_URL}/api/testimonials`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async () => {
    if (!name || !message) {
      alert(t.alert);
      return;
    }

    await axios.post(`${BASE_URL}/api/testimonials`, {
      name,
      message
    });

    alert(t.success);
    setName("");
    setMessage("");
    fetchReviews();
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">{t.title}</h1>

        <button
          onClick={() => setLang(lang === "en" ? "si" : "en")}
          className="mt-2 px-4 py-1 bg-gray-200 rounded"
        >
          {lang === "en" ? "සිංහල" : "English"}
        </button>
      </div>

      {/* FORM */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mb-10">

        <input
          placeholder={t.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <textarea
          placeholder={t.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={submitReview}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {t.submit}
        </button>
      </div>

      {/* REVIEWS */}
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.length === 0 && (
          <p className="text-center col-span-3">{t.empty}</p>
        )}

        {reviews.map((r) => (
          <div key={r._id} className="bg-white p-4 rounded shadow">
            <p>"{r.message}"</p>
            <b>- {r.name}</b>
          </div>
        ))}
      </div>

    </div>
  );
}