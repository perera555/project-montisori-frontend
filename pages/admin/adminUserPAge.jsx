import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  // ✅ LIVE CLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ FETCH USERS
  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data =
            res.data.users || res.data.list || res.data.data || res.data || [];
          setUsers(data);
          setLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load users ❌");
          setLoaded(true);
        });
    }
  }, [loaded]);

  // ✅ UPDATE ROLE
  const changeUserRole = async (id, role) => {
    try {
      await axios.put(
        `${API_URL}/api/users/${id}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Role updated ✅");
      setLoaded(false);
    } catch {
      toast.error("Update failed ❌");
    }
  };

  // ✅ DELETE USER
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted 🗑️");
      setShowModal(false);
      setLoaded(false);
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="w-full min-h-screen bg-green-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Users Management 🌱
        </h1>

        <div className="flex items-center gap-3">

          {/* ✅ ADD USER BUTTON */}
          {user?.role === "admin" && (
            <button
              onClick={() => {
                console.log("Navigating to Add User page...");
                navigate("/admin/users/add");
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow"
            >
              ➕ Add User
            </button>
          )}

          {/* CLOCK */}
          <div className="bg-white px-4 py-2 rounded-lg shadow text-sm text-gray-600">
            {currentTime.toLocaleString()}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full table-auto border-collapse">

          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-green-50 transition">
                  <td className="px-6 py-4 text-sm">
                    {u.firstName} {u.lastName}
                  </td>

                  <td className="px-6 py-4 text-sm">{u.email}</td>

                  <td className="px-6 py-4 text-sm">
                    {u.phone || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        changeUserRole(u._id, e.target.value)
                      }
                      className="border rounded-lg px-2 py-1"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedUser(u);
                        setShowModal(true);
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3"
            >
              <IoMdClose size={22} />
            </button>

            <h2 className="text-xl font-bold text-green-700 mb-4">
              User Details
            </h2>

            <p>{selectedUser.firstName} {selectedUser.lastName}</p>
            <p>{selectedUser.email}</p>
            <p>{selectedUser.phone}</p>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => deleteUser(selectedUser._id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                Delete User
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}