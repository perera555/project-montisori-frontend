import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export default function AdminTestimonialsPage() {

  const [reviews, setReviews] = useState([]);
  const [lang, setLang] = useState("en");

  const t = {
    title: lang === "en" ? "Admin Panel" : "පරිපාලක පැනලය",
    delete: lang === "en" ? "Delete" : "මකන්න",
    empty: lang === "en" ? "No reviews" : "අදහස් නොමැත"
  };

  const fetchReviews = async () => {
    const res = await axios.get(`${BASE_URL}/api/testimonials`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    await axios.delete(`${BASE_URL}/api/testimonials/${id}`);
    fetchReviews();
  };

  return (
    <div className="p-6">

      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{t.title}</h1>

        <button
          onClick={() => setLang(lang === "en" ? "si" : "en")}
          className="mt-2 px-4 py-1 bg-gray-200 rounded"
        >
          {lang === "en" ? "සිංහල" : "English"}
        </button>
      </div>

      {reviews.length === 0 && <p>{t.empty}</p>}

      {reviews.map((r) => (
        <div key={r._id} className="border p-4 mb-3 rounded">
          <p>"{r.message}"</p>
          <b>- {r.name}</b>

          <br />

          <button
            onClick={() => deleteReview(r._id)}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
          >
            {t.delete}
          </button>
        </div>
      ))}

    </div>
  );
}