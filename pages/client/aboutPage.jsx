import Navbar from "../../src/assets/components/navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AboutPage({ lang, setLang }) {

  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const whatsappNumber = "94700000000"; // 🔴 replace with real number

  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />

      <div className="pt-[80px]">

        {/* HERO */}
        <section className="relative text-white text-center py-28 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <motion.div variants={fadeUp} initial="hidden" animate="show"
            className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {lang === "en"
                ? "About UDAYA LAMAUYANA Montessori 🌱"
                : "උදය ලමායන මොන්ටිසෝරි ගැන 🌱"}
            </h1>
          </motion.div>
        </section>

        {/* TEACHERS */}
        <section className="py-16 px-6 bg-gray-100">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show"
            className="max-w-6xl mx-auto text-center">

            <h2 className="text-3xl font-bold mb-10">
              {lang === "en" ? "Our Teachers 👩‍🏫" : "අපගේ ගුරුවරුන් 👩‍🏫"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* PRINCIPAL */}
              <motion.div variants={fadeLeft} className="bg-white p-6 rounded-2xl shadow">
                <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178"
                  className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3>Ven. Weraduwe Siri Jothi Thero</h3>
                <p className="italic text-sm">
                  {lang === "en"
                    ? "Education builds strong character."
                    : "අධ්‍යාපනය චරිතය ගොඩනගයි."}
                </p>
              </motion.div>

              {/* MAIN */}
              <motion.div variants={fadeUp}
                className="bg-white p-6 rounded-2xl shadow-xl border-4 border-blue-400">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                  className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3>{lang === "en" ? "Dilhari Mhandiram" : "දිල්හාරි මහන්දිරම්"}</h3>
                <p className="italic text-sm">
                  {lang === "en"
                    ? "Guiding children with love."
                    : "දරුවන්ට ආදරයෙන් මගපෙන්වයි."}
                </p>
              </motion.div>

              {/* ASSISTANT */}
              <motion.div variants={fadeRight} className="bg-white p-6 rounded-2xl shadow">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                  className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3>{lang === "en" ? "Nipuni Wijerathna" : "නිපුනි විජේරත්න"}</h3>
                <p className="italic text-sm">
                  {lang === "en"
                    ? "Supporting children with care."
                    : "දරුවන්ට ආදරයෙන් සහාය දක්වයි."}
                </p>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* IMPROVED GALLERY */}
        <section className="py-16 px-6 bg-white">
          <h2 className="text-3xl text-center mb-10">
            {lang === "en" ? "Daily Activities 🌈" : "දෛනික ක්‍රියාකාරකම් 🌈"}
          </h2>

          <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              "photo-1509062522246-3755977927d7",
              "photo-1523050854058-8df90110c9f1",
              "photo-1584697964154-8f3c9c47b3c4",
              "photo-1544717305-2782549b5136"
            ].map((id, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl">
                <img
                  src={`https://images.unsplash.com/${id}`}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
                  {lang === "en" ? "Learning & Fun" : "ඉගෙනීම සහ විනෝදය"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADMISSION (WHATSAPP LINKED) */}
        <section className="py-16 px-6 bg-gray-100 text-center">
          <h2 className="text-3xl mb-6">
            {lang === "en" ? "Admission Open 📝" : "ඇතුළත් වීම ඇරඹේ 📝"}
          </h2>

          <button
            onClick={() =>
              window.open(`https://wa.me/${whatsappNumber}?text=I want to enroll my child`, "_blank")
            }
            className="bg-green-500 text-white px-8 py-4 rounded-full text-lg hover:scale-105 transition"
          >
            {lang === "en" ? "Apply via WhatsApp" : "WhatsApp මඟින් අයදුම් කරන්න"}
          </button>
        </section>

        {/* PHILOSOPHY (TEXT ONLY) */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl mb-4">
            {lang === "en" ? "Our Philosophy 🧘" : "අපගේ දර්ශනය 🧘"}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            {lang === "en"
              ? "We combine Montessori and Buddhist values to develop balanced, mindful children."
              : "මොන්ටිසෝරි සහ බෞද්ධ වටිනාකම් එක් කරමින් සමබර දරුවන් ගොඩනගයි."}
          </p>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16">
          <h2 className="text-3xl mb-4">
            {lang === "en" ? "Join Us 🌟" : "අප සමඟ එක්වන්න 🌟"}
          </h2>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-blue-600 px-6 py-3 rounded"
          >
            {lang === "en" ? "Contact Us" : "අප අමතන්න"}
          </button>
        </section>

        {/* FOOTER */}
        <footer className="bg-black text-white text-center py-6">
          {lang === "en"
            ? "© 2026 UDAYA LAMAUYANA Montessori. All rights reserved."
            : "© 2026 සියලු හිමිකම් සුරක්ෂිතයි."}
        </footer>

        {/* WHATSAPP FLOAT */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg"
        >
          💬
        </a>

      </div>
    </div>
  );
}