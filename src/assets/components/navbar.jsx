import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import logo from "../../assets/logo/logo.png";

export default function Navbar({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 z-50 h-[70px] w-full flex items-center justify-between px-4 bg-blue-600 text-white shadow-md">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-3xl"
          onClick={() => setIsOpen(true)}
        >
          <GiHamburgerMenu />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Pre School Logo"
            className="h-[40px]"
          />
          <span className="hidden md:block text-lg font-semibold">
            {lang === "en"
              ? "Udaya Lama Uyana Pre School"
              : "උදය ලමා උයන පෙර පාසල"}
          </span>
        </Link>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden lg:flex gap-8 font-medium">
        <Link to="/" className="hover:text-yellow-300">
          {lang === "en" ? "Home" : "මුල් පිටුව"}
        </Link>

        <Link to="/about" className="hover:text-yellow-300">
          {lang === "en" ? "About" : "අප ගැන"}
        </Link>

        <Link to="/gallery" className="hover:text-yellow-300">
          {lang === "en" ? "Gallery" : "ගැලරි"}
        </Link>

        <Link to="/announcements" className="hover:text-yellow-300">
          {lang === "en" ? "Announcements" : "නිවේදන"}
        </Link>

        <Link to="/contact" className="hover:text-yellow-300">
          {lang === "en" ? "Contact" : "සම්බන්ධ වන්න"}
        </Link>

        {/* ⭐ ADDED TESTIMONIALS */}
        <Link to="/testimonials" className="hover:text-yellow-300">
          {lang === "en" ? "Testimonials" : "අදහස්"}
        </Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* LANGUAGE BUTTON */}
        <button
          onClick={() => setLang(lang === "en" ? "si" : "en")}
          className="px-3 py-1 rounded-full bg-white text-blue-600 text-sm font-semibold hover:bg-gray-200 transition"
        >
          {lang === "en" ? "සි" : "EN"}
        </button>

        {/* USER */}
        {user && (
          <span className="text-sm font-medium">
            {user.name || user.email?.split("@")[0]}
          </span>
        )}

        {/* LOGOUT */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            {lang === "en" ? "Logout" : "ඉවත් වන්න"}
          </button>
        )}

        {/* LOGIN */}
        {!user && (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-200 transition"
          >
            {lang === "en" ? "Login" : "පිවිසෙන්න"}
          </button>
        )}
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white text-gray-800 z-50 p-6 flex flex-col
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <button
          className="text-lg mb-6 text-left"
          onClick={() => setIsOpen(false)}
        >
          ✕ {lang === "en" ? "Close" : "වසන්න"}
        </button>

        <Link to="/" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          {lang === "en" ? "Home" : "මුල් පිටුව"}
        </Link>

        <Link to="/about" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          {lang === "en" ? "About" : "අප ගැන"}
        </Link>

        <Link to="/gallery" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          {lang === "en" ? "Gallery" : "ගැලරි"}
        </Link>

        <Link to="/announcements" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          {lang === "en" ? "Announcements" : "නිවේදන"}
        </Link>

        <Link to="/contact" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          {lang === "en" ? "Contact" : "සම්බන්ධ වන්න"}
        </Link>

        {/* ⭐ ADDED TESTIMONIALS */}
        <Link to="/testimonials" onClick={() => setIsOpen(false)}
          className="py-3 px-3 rounded-md hover:bg-blue-600 hover:text-white">
          {lang === "en" ? "Testimonials" : "අදහස්"}
        </Link>

      </div>

    </header>
  );
}