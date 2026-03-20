import Navbar from "../../src/assets/components/navbar";

export default function ContactPage() {
  return (
    <div>
      <Navbar />

      <div className="pt-[80px]">

        {/* HERO */}
        <section className="bg-blue-600 text-white text-center py-20 px-6">
          <h1 className="text-4xl font-extrabold mb-4">
            Contact Us 📞
          </h1>
          <p className="text-lg">
            We are here to help you and your child start a beautiful journey 🌱
          </p>
        </section>

        {/* CONTACT INFO */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Get in Touch
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Teacher 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                👩‍🏫 Teacher Nadeesha
              </h3>
              <p className="text-gray-600 mb-2">📞 071 234 5678</p>

              <a
                href="https://wa.me/94712345678"
                target="_blank"
                className="inline-block mt-2 bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
            </div>

            {/* Teacher 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                👩‍🏫 Teacher Dilani
              </h3>
              <p className="text-gray-600 mb-2">📞 077 987 6543</p>

              <a
                href="https://wa.me/94779876543"
                target="_blank"
                className="inline-block mt-2 bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
            </div>

            {/* General Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">
                🏫 Office Contact
              </h3>
              <p className="text-gray-600 mb-2">📞 011 123 4567</p>

              <a
                href="https://wa.me/94111234567"
                target="_blank"
                className="inline-block mt-2 bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
            </div>

          </div>
        </section>

        {/* LOCATION */}
        <section className="bg-gray-100 py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
            Our Location 📍
          </h2>

          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Maharagama,Sri+Lanka&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <p className="text-center text-gray-600 mt-4">
            UDAYA LAMAUYANA Montessori, Maharagama, Sri Lanka
          </p>
        </section>

        {/* QUICK MESSAGE */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Send a Quick Message 💬
          </h2>

          <p className="text-gray-600 mb-6">
            Reach us instantly on WhatsApp for quick responses.
          </p>

          <a
            href="https://wa.me/94712345678"
            target="_blank"
            className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition"
          >
            Chat on WhatsApp
          </a>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white text-center py-6">
          <p>© 2026 UDAYA LAMAUYANA Montessori. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}