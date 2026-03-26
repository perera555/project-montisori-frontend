import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Image,
  Megaphone,
  LogOut,
  Home,
  MessageSquare // ✅ ADD ICON
} from "lucide-react";

export default function Sidebar({ logout }) {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Students", path: "/admin/students", icon: <Users size={18} /> },
    { name: "Teachers", path: "/admin/teachers", icon: <UserCheck size={18} /> },
    { name: "Gallery", path: "/admin/gallery", icon: <Image size={18} /> },
    { name: "Announcements", path: "/admin/announcements", icon: <Megaphone size={18} /> },

    // ✅ ADD THIS LINE
    { name: "Testimonials", path: "/admin/testimonials", icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between p-4">

      <div>
        <h2 className="text-xl font-bold mb-8 text-center">
          Montessori Admin
        </h2>

        <ul className="space-y-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg
                    ${isActive ? "bg-blue-500" : "hover:bg-gray-800"}`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-500"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}