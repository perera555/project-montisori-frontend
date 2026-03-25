import Navbar from "../../src/assets/components/navbar";
import { motion } from "framer-motion";

export default function AboutPage({ lang, setLang }) {

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
            <p className="text-lg text-gray-200">
              {lang === "en"
                ? "Nurturing young minds with care, wisdom, and strong moral values."
                : "දරුවන්ගේ මනස ආදරයෙන්, ඥානයෙන් සහ වටිනාකම් සමඟ වර්ධනය කිරීම."}
            </p>
          </motion.div>
        </section>

        {/* TEACHERS */}
        <section className="py-16 px-6 bg-gray-100">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center">

            <h2 className="text-3xl font-bold mb-10 text-gray-800">
              {lang === "en"
                ? "Our Teachers & Guidance 👩‍🏫"
                : "අපගේ ගුරුවරුන් සහ මගපෙන්වීම 👩‍🏫"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              {/* PRINCIPAL */}
              <motion.div variants={fadeLeft}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-3">
                <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200" />
                <h3 className="font-semibold text-purple-600 text-lg">
                  Ven. Weraduwe Siri Jothi Thero
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "en" ? "Principal & Spiritual Leader" : "ප්‍රධාන ආචාර්ය"}
                </p>
                <p className="text-gray-600 text-sm italic">
                  {lang === "en"
                    ? `"Education builds knowledge and strong character."`
                    : `"අධ්‍යාපනය චරිතය ගොඩනගයි."`}
                </p>
              </motion.div>

              {/* MAIN */}
              <motion.div variants={fadeUp}
                className="bg-white p-6 rounded-2xl shadow-2xl border-4 border-blue-400 hover:-translate-y-4 transition">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-300" />
                <h3 className="font-bold text-blue-700 text-xl">
                  {lang === "en" ? "Mrs. Dilhari Mhandiram" : "දිල්හාරි මහන්දිරම්"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  ⭐ {lang === "en" ? "Main Teacher" : "ප්‍රධාන ගුරුවරිය"}
                </p>
                <p className="text-gray-700 text-sm italic">
                  {lang === "en"
                    ? `"Guiding children with love and creativity."`
                    : `"දරුවන්ට ආදරයෙන් මගපෙන්වයි."`}
                </p>
              </motion.div>

              {/* ASSISTANT */}
              <motion.div variants={fadeRight}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-3">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-green-200" />
                <h3 className="font-semibold text-green-600 text-lg">
                  {lang === "en" ? "Miss. Nipuni Wijerathna" : "නිපුනි විජේරත්න"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "en" ? "Assistant Teacher" : "সহায়ක ගුරුවරිය"}
                </p>
                <p className="text-gray-600 text-sm italic">
                  {lang === "en"
                    ? `"Supports children with care and patience."`
                    : `"දරුවන්ට ආදරයෙන් සහාය දක්වයි."`}
                </p>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* STORY + MISSION + VISION */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <motion.div variants={fadeLeft} initial="hidden" whileInView="show">
            <h2 className="text-3xl font-bold mb-4">
              {lang === "en" ? "Our Story" : "අපගේ කතාව"}
            </h2>
            <p className="text-gray-600">
              {lang === "en"
                ? "A safe and loving place for early learning."
                : "ආරක්ෂිත හා ආදරණීය ඉගෙනුම් පරිසරයක්."}
            </p>
          </motion.div>

          <motion.div variants={fadeRight} initial="hidden" whileInView="show">
            <h3 className="text-blue-600 font-semibold">🎯 Mission</h3>
            <p className="mb-3">Strong foundation</p>
            <h3 className="text-green-600 font-semibold">🌟 Vision</h3>
            <p>Responsible individuals</p>
          </motion.div>

        </section>

        {/* PHILOSOPHY */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <motion.img
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              src="https://images.unsplash.com/photo-1544717305-2782549b5136"
              className="rounded-2xl shadow-xl"
            />

            <motion.div variants={fadeRight} initial="hidden" whileInView="show">
              <h2 className="text-3xl font-bold mb-4">
                {lang === "en" ? "Our Philosophy 🧘" : "අපගේ දර්ශනය 🧘"}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {lang === "en"
                  ? "Our approach combines Montessori education with Buddhist values. We believe early childhood is the most important stage of life. Through mindfulness and guided learning, we help children grow into balanced individuals."
                  : "අපගේ ක්‍රමවේදය මොන්ටිසෝරි හා බෞද්ධ වටිනාකම් එකතු කරමින්, සිහිබුද්ධිය සහ මගපෙන්වූ ඉගෙනීම මඟින් දරුවන් සමබර පුද්ගලයන් ලෙස වර්ධනය කරයි."}
              </p>
            </motion.div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16 px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show">
            <h2 className="text-3xl font-bold mb-4">
              {lang === "en" ? "Join Our Montessori Family 🌟" : "එක්වන්න 🌟"}
            </h2>
            <motion.button whileHover={{ scale: 1.1 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full">
              {lang === "en" ? "Contact Us" : "අමතන්න"}
            </motion.button>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show">
            <p>
              {lang === "en"
                ? "© 2026 UDAYA LAMAUYANA Montessori. All rights reserved."
                : "© 2026 සියලු හිමිකම් සුරක්ෂිතයි."}
            </p>
          </motion.div>
        </footer>

      </div>
    </div>
  );
}