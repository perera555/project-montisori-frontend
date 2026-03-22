import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";

// ADMIN
import UpdateStudent from "../pages/admin/updatestudent";
import AddStudent from "../pages/admin/addstudent";
import Student from "../pages/admin/student";
import AdminGallery from "../pages/admin/admingallery";
import AdminPage from "../pages/admin/adminpage";
import AddTeacher from "../pages/admin/addteachers";
import AdminTeachers from "../pages/admin/teacher";
import UpdateTeacher from "../pages/admin/updateteachers";
import Announcement from "../pages/admin/adminAnnouncemnt";
import AdminUsersPage from "../pages/admin/adminUserPAge";
import AddUserPage from "../pages/admin/addUserPage"; // ✅ ADDED

// CLIENT
import Gallery from "../pages/client/gallery";
import HomePage from "../pages/client/homepage";
import AnnouncementClient from "../pages/client/announcemntClient";
import LoginPage from "../pages/client/login";
import RegisterPage from "../pages/client/register";
import AboutPage from "../pages/client/aboutPage";
import ContactPage from "../pages/client/contactPage";

function App() {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>

          {/* CLIENT */}
          <Route path="/" element={<HomePage lang={lang} setLang={setLang} user={user} />} />
          <Route path="/gallery" element={<Gallery lang={lang} setLang={setLang} user={user} />} />
          <Route path="/announcements" element={<AnnouncementClient lang={lang} setLang={setLang} user={user} />} />
          <Route path="/about" element={<AboutPage lang={lang} setLang={setLang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} setLang={setLang} />} />

          {/* AUTH */}
          <Route path="/login" element={<LoginPage setUser={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminPage user={user} logout={handleLogout} />} />

          {/* USERS */}
          <Route path="/admin/users" element={<AdminUsersPage user={user} />} />
          <Route path="/admin/users/add" element={<AddUserPage user={user} />} /> {/* ✅ FIX */}

          {/* STUDENTS */}
          <Route path="/admin/students" element={<Student user={user} />} />
          <Route path="/admin/students/add" element={<AddStudent user={user} />} />
          <Route path="/admin/students/update/:id" element={<UpdateStudent user={user} />} />

          {/* TEACHERS */}
          <Route path="/admin/teachers" element={<AdminTeachers user={user} />} />
          <Route path="/admin/teachers/add" element={<AddTeacher user={user} />} />
          <Route path="/admin/teachers/update/:id" element={<UpdateTeacher user={user} />} />

          {/* OTHER ADMIN */}
          <Route path="/admin/gallery" element={<AdminGallery user={user} />} />
          <Route path="/admin/announcements" element={<Announcement user={user} />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />

        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;