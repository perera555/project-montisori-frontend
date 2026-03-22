import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
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

  // ✅ FETCH TEACHERS
  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${API_URL}/api/teachers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setTeachers(res.data.list || []);
          setLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load teachers ❌");
          setLoaded(true);
        });
    }
  }, [loaded]);

  // ✅ DELETE TEACHER
  const deleteTeacher = async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await axios.delete(`${API_URL}/api/teachers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Teacher deleted 🗑️");
      setShowModal(false);
      setLoaded(false);
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="w-full min-h-screen bg-purple-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">
          Teachers Management 👩‍🏫
        </h1>

        <div className="flex items-center gap-3">

          {/* ADD BUTTON */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/teachers/add")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow"
            >
              ➕ Add Teacher
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

        <table className="w-full">

          <thead className="bg-purple-100 text-purple-800">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th>Experience</th>
              <th>Phone</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length > 0 ? (
              teachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="border-b hover:bg-purple-50 transition"
                >
                  <td className="p-4 font-medium">
                    {teacher.name}
                  </td>

                  <td>{teacher.experience}</td>

                  <td>{teacher.phone}</td>

                  <td className="text-center">
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowModal(true);
                      }}
                      className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No teachers found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <IoMdClose size={22} />
            </button>

            <h2 className="text-xl font-bold text-purple-700 mb-4">
              Teacher Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p><b>Name:</b> {selectedTeacher.name}</p>
              <p><b>Experience:</b> {selectedTeacher.experience}</p>
              <p><b>Phone:</b> {selectedTeacher.phone}</p>
            </div>

            <div className="mt-6 space-y-3">

              <button
                onClick={() =>
                  navigate(`/admin/teachers/update/${selectedTeacher._id}`)
                }
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Update Teacher
              </button>

              <button
                onClick={() => deleteTeacher(selectedTeacher._id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Delete Teacher
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}