import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import UpdateStudent from "../pages/admin/updatestudent";
import AddStudent from "../pages/admin/addstudent";
import Student from "../pages/admin/student";
import AdminGallery from "../pages/admin/admingallery";
import AdminPage from "../pages/admin/adminpage";
import Gallery from "../pages/client/gallery";
import HomePage from "../pages/client/homepage";
import AddTeacher from "../pages/admin/addteachers";
import AdminTeachers from "../pages/admin/teacher";
import UpdateTeacher from "../pages/admin/updateteachers";
import Announcement from "../pages/admin/adminAnnouncemnt";
import AnnouncementClient from "../pages/client/announcemntClient";
import LoginPage from "../pages/client/login";
import RegisterPage from "../pages/client/register";

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter>
        <Toaster position="top-right" />

        <Routes>
          {/* CLIENT */}
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/announcements" element={<AnnouncementClient />} />

          {/* LOGIN */}
          <Route path="/login" element={<LoginPage />} />
               <Route path="/register" element={<RegisterPage/>} />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />

          {/* STUDENTS */}
          <Route path="/admin/students" element={<Student />} />
          <Route path="/admin/students/add" element={<AddStudent />} />
          <Route path="/admin/students/update/:id" element={<UpdateStudent />} />

          {/* TEACHERS */}
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/teachers/add" element={<AddTeacher />} />
          <Route path="/admin/teachers/update/:id" element={<UpdateTeacher />} />

          {/* ANNOUNCEMENTS */}
          <Route path="/admin/announcements" element={<Announcement />} />

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