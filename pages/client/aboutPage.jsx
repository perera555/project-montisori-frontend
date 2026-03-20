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
                ? "About UDAYA LAMAUYANA Montessori 🌱"
                : "උදය ලමායන මොන්ටිසෝරි ගැන 🌱"}
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
                ? "UDAYA LAMAUYANA Montessori is a place where children begin their journey of learning in a safe, loving, and inspiring environment. Guided by Ven. Weraduwe Siri Jothi Thero, we focus on building knowledge along with discipline, kindness, and respect."
                : "උදය ලමායන මොන්ටිසෝරි යනු දරුවන්ට ආරක්ෂිත, ආදරණීය සහ ප්‍රේරණාත්මක පරිසරයකින් ඉගෙනීම ආරම්භ කරන ස්ථානයකි. වෙන. වෙරදුවේ සිරි ජෝති හිමියන්ගේ මගපෙන්වීම යටතේ අපි දැනුම, විනය, කරුණාව සහ ගරුත්වය වර්ධනය කරයි."}
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
                  ? "To provide a strong educational foundation through Montessori methods while nurturing moral values, creativity, and independence."
                  : "මොන්ටිසෝරි ක්‍රමය මඟින් ශක්තිමත් අධ්‍යාපන පදනමක් ලබාදීම සහ වටිනාකම්, නිර්මාණශීලීත්වය හා ස්වාධීනත්වය වර්ධනය කිරීම."}
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
                  ? "To raise confident, compassionate, and responsible individuals who contribute positively to society."
                  : "සමාජයට යහපත් දායකත්වයක් ලබාදෙන විශ්වාසවන්ත, කරුණාවන්ත සහ වගකීම් සහිත පුද්ගලයන් ගොඩනැගීම."}
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
                  ? "Our approach combines Montessori education with Buddhist values. We believe early childhood is the most important stage of life. Through mindfulness and guided learning, we help children grow into balanced individuals."
                  : "අපගේ ක්‍රමවේදය මොන්ටිසෝරි අධ්‍යාපනය හා බෞද්ධ වටිනාකම් එක් කරයි. මුල් ළමා අවධිය ජීවිතයේ වැදගත්ම කාලය බව අපි විශ්වාස කරමු."}
              </p>
            </div>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">
              {lang === "en" ? "Why Choose Us? 💡" : "අප තෝරාගත යුත්තේ ඇයි? 💡"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold text-lg text-green-600 mb-2">
                  {lang === "en" ? "🌱 Holistic Development" : "🌱 සම්පූර්ණ වර්ධනය"}
                </h3>
                <p className="text-gray-600">
                  {lang === "en"
                    ? "We focus on mental, emotional, and social growth."
                    : "මානසික, భావාත්මක සහ සමාජ වර්ධනය කෙරෙහි අවධානය යොමු කරයි."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold text-lg text-blue-600 mb-2">
                  {lang === "en" ? "🧠 Montessori Learning" : "🧠 මොන්ටිසෝරි ඉගෙනීම"}
                </h3>
                <p className="text-gray-600">
                  {lang === "en"
                    ? "Child-centered education that encourages independence."
                    : "දරුවා මධ්‍යයේ ඇති ස්වාධීනත්වය ප්‍රවර්ධනය කරන අධ්‍යාපනය."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-semibold text-lg text-purple-600 mb-2">
                  {lang === "en" ? "❤️ Caring Environment" : "❤️ ආදරණීය පරිසරය"}
                </h3>
                <p className="text-gray-600">
                  {lang === "en"
                    ? "A safe and loving place where every child is valued."
                    : "සෑම දරුවෙකුටම වටිනාකමක් ලැබෙන ආරක්ෂිත හා ආදරණීය පරිසරයක්."}
                </p>
              </div>

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
                <img src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-purple-600">Ven. Weraduwe Siri Jothi Thero</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "en" ? "Spiritual Leader & Principal" : "ආධ්‍යාත්මික නායක හා ප්‍රධාන ආචාර්ය"}
                </p>
                <p className="text-gray-600 text-sm">
                  {lang === "en"
                    ? "Provides spiritual guidance and helps children develop discipline, mindfulness, and strong moral values."
                    : "දරුවන්ට විනය සහ වටිනාකම් වර්ධනය කිරීමට මගපෙන්වයි."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-blue-600">
                  {lang === "en" ? "Mrs. Nadeesha Perera" : "නදීෂා පෙරේරා මහත්මිය"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "en" ? "Lead Montessori Teacher" : "ප්‍රධාන ගුරුවරිය"}
                </p>
                <p className="text-gray-600 text-sm">
                  {lang === "en"
                    ? "Encourages creativity, independence, and joyful learning."
                    : "සೃජනශීලීත්වය සහ සතුටින් ඉගෙනීම ප්‍රවර්ධනය කරයි."}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-semibold text-green-600">
                  {lang === "en" ? "Miss. Sanduni Silva" : "සඳුනි සිල්වා"}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {lang === "en" ? "Assistant Teacher" : "সহায়ක ගුරුවරිය"}
                </p>
                <p className="text-gray-600 text-sm">
                  {lang === "en"
                    ? "Supports children with care, patience, and attention."
                    : "දරුවන්ට ආදරයෙන් සහාය දක්වයි."}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white text-center py-16 px-6">
          <h2 className="text-3xl font-bold mb-4">
            {lang === "en"
              ? "Join Our Montessori Family 🌟"
              : "අපගේ මොන්ටිසෝරි පවුලට එක්වන්න 🌟"}
          </h2>
          <p className="mb-6">
            {lang === "en"
              ? "Give your child the best start in life with us."
              : "ඔබේ දරුවාට හොඳම ආරම්භයක් ලබාදෙන්න."}
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
              : "© 2026 උදය ලමායන මොන්ටිසෝරි. සියලු හිමිකම් සුරක්ෂිතයි."}
          </p>
        </footer>

      </div>
    </div>
  );
}