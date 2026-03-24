import Navbar from "../../src/assets/components/navbar";

export default function AboutPage({ lang, setLang }) {
  return (
    <div>
      <Navbar lang={lang} setLang={setLang} />

      <div className="pt-[80px]">

        {/* HERO */}
        <section className="relative text-white text-center py-28 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              alt="Children learning"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {lang === "en"
                ? "ABOUT UDAYA LAMAUYANA Pre School 🌱"
                : "උදය ලමායන පෙර පාසල ගැන 🌱"}
            </h1>
            <p className="text-lg text-gray-200">
              {lang === "en"
                ? "Nurturing young minds with care, wisdom, and strong moral values."
                : "දරුවන්ගේ මනස ආදරයෙන්, ඥානයෙන් සහ ශක්තිමත් වටිනාකම් සමඟ වර්ධනය කිරීම."}
            </p>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {lang === "en" ? "Our Story" : "අපගේ කතාව"}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {lang === "en"
                ? "UDAYA LAMAUYANA Pre School is a place where children begin their journey of learning in a safe, loving, and inspiring environment."
                : "උදය ලමායන පෙර පාසල යනු දරුවන්ට ආරක්ෂිත, ආදරණීය පරිසරයකින් ඉගෙනීම ආරම්භ කරන ස්ථානයකි."}
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
            className="rounded-2xl shadow-md"
            alt="Kids learning"
          />
        </section>

        {/* MISSION */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <img
              src="https://images.unsplash.com/photo-1584697964154-8f3c9c47b3c4"
              className="rounded-2xl shadow-md"
              alt="Mission"
            />

            <div>
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                {lang === "en" ? "🎯 Our Mission" : "🎯 අපගේ මෙහෙවර"}
              </h3>
              <p className="text-gray-600">
                {lang === "en"
                  ? "To provide a strong educational foundation while nurturing moral values, creativity, and independence."
                  : "ශක්තිමත් අධ්‍යාපන පදනමක් ලබාදීම සහ වටිනාකම් වර්ධනය කිරීම."}
              </p>
            </div>

          </div>
        </section>

        {/* VISION */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                {lang === "en" ? "🌟 Our Vision" : "🌟 අපගේ දැක්ම"}
              </h3>
              <p className="text-gray-600">
                {lang === "en"
                  ? "To raise confident, compassionate, and responsible individuals."
                  : "වගකීම් සහිත පුද්ගලයන් ගොඩනැගීම."}
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
              className="rounded-2xl shadow-md"
              alt="Vision"
            />

          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136"
              className="rounded-2xl shadow-md"
              alt="Philosophy"
            />

            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {lang === "en" ? "Our Philosophy 🧘" : "අපගේ දර්ශනය 🧘"}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {lang === "en"
                  ? "We believe early childhood is the most important stage of life."
                  : "මුල් ළමා අවධිය ජීවිතයේ වැදගත්ම කාලයයි."}
              </p>
            </div>

          </div>
        </section>

        {/* TEACHERS & PRINCIPAL */}
        <section className="py-16 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">

            <h2 className="text-3xl font-bold mb-10 text-gray-800">
              {lang === "en"
                ? "Our Teachers & Guidance 👩‍🏫"
                : "අපගේ ගුරුවරුන් සහ මගපෙන්වීම 👩‍🏫"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-2xl shadow">
                <img src="/images/m10.jpeg" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-purple-600">Principal</h3>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <img src="/images/M11.jpeg" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-blue-600">Main Teacher</h3>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <img src="/images/M11.jpeg" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-green-600">Assistant Teacher</h3>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>© 2026 UDAYA LAMAUYANA Pre School. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}