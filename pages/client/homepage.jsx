import Navbar from "../../src/assets/components/navbar";

export default function HomePage({ lang, setLang }) {
  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />

      <div className="pt-[80px]">

        {/* HERO SECTION */}
        <section className="relative text-white text-center py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              alt="Montessori kids learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              {lang === "en"
                ? "🌱 UDAYA LAMAUYANA Montessori"
                : "🌱 උදය ලමා උයන මොන්ටිසෝරි"}
            </h1>

            <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-200">
              {lang === "en"
                ? "Guided and supported by Ven. Weraduwe Siri Jothi Thero, providing a caring and meaningful foundation for every child."
                : "වෙන. වෙරදුවේ සිරි ජෝති හිමියන්ගේ මගපෙන්වීම යටතේ දරුවන්ට ආදරණීය හා වටිනා පදනමක් ලබාදෙයි."}
            </p>
          </div>
        </section>

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
                  text: "Guidance inspired by Buddhist principles for good behavior and respect.",
                },
                {
                  title: "🧠 Early Education Excellence",
                  text: "Strong foundation in learning and problem-solving.",
                },
                {
                  title: "🎨 Creative Development",
                  text: "Activities that build creativity and confidence.",
                },
                {
                  title: "❤️ Loving Environment",
                  text: "A warm and caring atmosphere for every child.",
                },
                {
                  title: "🛡️ Safety & Protection",
                  text: "Secure and supervised environment.",
                },
                {
                  title: "🌱 Moral Guidance",
                  text: "Blessings and guidance under Ven. Weraduwe Siri Jothi Thero.",
                },
              ]
              : [
                {
                  title: "🧘 විනය හා වටිනාකම්",
                  text: "හොඳ හැසිරීම් සහ ගරුත්වය වර්ධනය කිරීම.",
                },
                {
                  title: "🧠 මුල් අධ්‍යාපනය",
                  text: "ශක්තිමත් ඉගෙනීමේ පදනමක්.",
                },
                {
                  title: "🎨 නිර්මාණශීලී වර්ධනය",
                  text: "සೃජනශීලීත්වය සහ විශ්වාසය වර්ධනය කිරීම.",
                },
                {
                  title: "❤️ ආදරණීය පරිසරය",
                  text: "සෑම දරුවෙකුටම ආදරණීය පරිසරයක්.",
                },
                {
                  title: "🛡️ ආරක්ෂාව",
                  text: "ආරක්ෂිත සහ පරීක්ෂිත පරිසරයක්.",
                },
                {
                  title: "🌱 නෙත්තික මගපෙන්වීම",
                  text: "සිරි ජෝති හිමියන්ගේ මගපෙන්වීම.",
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

        {/* PROGRAMS */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">
              {lang === "en" ? "🎓 Our Programs" : "🎓 අපගේ වැඩසටහන්"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-green-600">
                  {lang === "en" ? "🌱 Early Exploration" : "🌱 මුල් අත්දැකීම්"}
                </h3>
                <p>
                  {lang === "en"
                    ? "Hands-on activities to explore the world through play and curiosity."
                    : "ක්‍රීඩා මඟින් ලෝකය හඳුනාගැනීම."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-blue-600">
                  {lang === "en" ? "🧠 Cognitive Development" : "🧠 බුද්ධි වර්ධනය"}
                </h3>
                <p>
                  {lang === "en"
                    ? "Develop thinking and problem-solving skills."
                    : "ගැටලු විසඳීමේ හැකියාව වර්ධනය කිරීම."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h3 className="text-purple-600">
                  {lang === "en" ? "🎨 Creative Arts" : "🎨 නිර්මාණශීලී කලාව"}
                </h3>
                <p>
                  {lang === "en"
                    ? "Art, music, and storytelling activities."
                    : "කලා සහ සංගීත ක්‍රියාකාරකම්."}
                </p>
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
          <p className="mb-6">
            <Link to="/contact" className="underline">
              {lang === "en"
                ? "Join UDAYA LAMAUYANA Montessori today."
                : "අදම අපට එක්වන්න."}
            </Link>
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold">
            {lang === "en" ? "Contact Us" : "අප අමතන්න"}
          </button>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>
            {lang === "en"
              ? "© 2026 UDAYA LAMAUYANA Montessori. All rights reserved."
              : "© 2026 උදය ලමා උයන  මොන්ටිසෝරි. සියලු හිමිකම් සුරක්ෂිතයි."}
          </p>
        </footer>

      </div>
    </div>
  );
}