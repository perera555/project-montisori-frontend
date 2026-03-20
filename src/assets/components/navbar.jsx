import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 z-50 h-[70px] w-full flex items-center justify-between px-4 bg-blue-600 text-white shadow-md">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-3xl"
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Montessori School"
            className="h-[40px]"
          />
          <span className="hidden md:block text-lg font-semibold">
            Montessori School
          </span>
        </Link>
      </div>

      {/* ================= DESKTOP NAV ================= */}
      <div className="hidden lg:flex gap-8 font-medium">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/about" className="hover:text-yellow-300">About</Link>
        <Link to="/gallery" className="hover:text-yellow-300">Gallery</Link>
        <Link to="/announcements" className="hover:text-yellow-300">Announcements</Link>
        <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-4">

        {/* 🌐 LANGUAGE BUTTON (NOW WORKING) */}
        <button
          onClick={() => setLang(lang === "en" ? "si" : "en")}
          className="px-3 py-1 rounded-full bg-white text-blue-600 text-sm font-semibold hover:bg-gray-200 transition"
        >
          {lang === "en" ? "සි" : "EN"}
        </button>

        {/* SHOW USER NAME OR EMAIL */}
        {user && (
          <span className="text-sm font-medium">
            {user.name || user.email?.split("@")[0]}
          </span>
        )}

        {/* LOGOUT BUTTON */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}

        {/* LOGIN BUTTON */}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition"
          >
            Login
          </button>
        )}
      </div>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white text-gray-800 z-50 p-6 flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <button
          className="text-lg mb-6 text-left"
          onClick={() => setIsOpen(false)}
        >
          ✕ Close
        </button>

        <Link to="/" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          Home
        </Link>

        <Link to="/about" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          About
        </Link>

        <Link to="/gallery" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          Gallery
        </Link>

        <Link to="/announcements" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          Announcements
        </Link>

        <Link to="/contact" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          Contact
        </Link>

      </div>

    </header>
  );
}