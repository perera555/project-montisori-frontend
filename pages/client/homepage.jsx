import Navbar from "../../src/assets/components/navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />

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
              🌱 UDAYA LAMAUYANA Montessori
            </h1>

            <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-200">
              Guided and supported by Ven. Weraduwe Siri Jothi Thero,
              providing a caring and meaningful foundation for every child.
            </p>

            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Enroll Now
            </button>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-16 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            🌟 Benefits for Your Child
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "🧘 Discipline & Values",
                color: "text-green-600",
                text: "Guidance inspired by Buddhist principles for good behavior and respect.",
              },
              {
                title: "🧠 Early Education Excellence",
                color: "text-blue-600",
                text: "Strong foundation in learning and problem-solving.",
              },
              {
                title: "🎨 Creative Development",
                color: "text-purple-600",
                text: "Activities that build creativity and confidence.",
              },
              {
                title: "❤️ Loving Environment",
                color: "text-yellow-600",
                text: "A warm and caring atmosphere for every child.",
              },
              {
                title: "🛡️ Safety & Protection",
                color: "text-red-500",
                text: "Secure and supervised environment.",
              },
              {
                title: "🌱 Moral Guidance",
                color: "text-indigo-600",
                text: "Blessings and guidance under Ven. Weraduwe Siri Jothi Thero.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg p-6 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition"
              >
                <h3 className={`text-xl font-semibold mb-2 ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRAMS (UPDATED) */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10 text-gray-800">
              🎓 Our Programs
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2 text-green-600">
                  🌱 Early Exploration
                </h3>
                <p className="text-gray-600">
                  Hands-on activities to explore the world through play and curiosity.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2 text-blue-600">
                  🧠 Cognitive Development
                </h3>
                <p className="text-gray-600">
                  Develop thinking and problem-solving skills.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2 text-purple-600">
                  🎨 Creative Arts
                </h3>
                <p className="text-gray-600">
                  Art, music, and storytelling activities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2 text-yellow-600">
                  🧘 Mindfulness & Values
                </h3>
                <p className="text-gray-600">
                  Teaching discipline, calmness, and respect.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2 text-red-500">
                  🤝 Social Skills
                </h3>
                <p className="text-gray-600">
                  Encouraging teamwork and communication.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                <h3 className="font-semibold text-lg mb-2 text-indigo-600">
                  🌍 Life Skills
                </h3>
                <p className="text-gray-600">
                  Teaching independence and responsibility.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            📸 Activities & Moments
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
            Give Your Child a Bright Future 🌟
          </h2>
          <p className="mb-6">
            Join UDAYA LAMAUYANA Montessori today.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Contact Us
          </button>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>© 2026 UDAYA LAMAUYANA Montessori. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}