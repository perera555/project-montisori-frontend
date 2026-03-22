import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
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

  // ✅ FETCH STUDENTS
  useEffect(() => {
    if (!loaded) {
      axios
        .get(`${API_URL}/api/students`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setStudents(res.data || []);
          setLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load students ❌");
          setLoaded(true);
        });
    }
  }, [loaded]);

  // ✅ DELETE STUDENT
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API_URL}/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Student deleted 🗑️");
      setShowModal(false);
      setLoaded(false);
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Students Management 🎓
        </h1>

        <div className="flex items-center gap-3">

          {/* ADD BUTTON */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/students/add")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow"
            >
              ➕ Add Student
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

          {/* HEADER */}
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th>Age</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student._id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-4 font-medium">
                    {student.name}
                  </td>

                  <td>{student.age}</td>

                  <td className="text-center">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowModal(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* MODAL */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

          <div className="bg-white w-[450px] rounded-2xl shadow-xl p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <IoMdClose size={22} />
            </button>

            <h2 className="text-xl font-bold text-blue-700 mb-4">
              Student Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p><b>Name:</b> {selectedStudent.name}</p>
              <p><b>Age:</b> {selectedStudent.age}</p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 space-y-3">

              <button
                onClick={() =>
                  navigate(`/admin/students/update/${selectedStudent._id}`)
                }
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Update Student
              </button>

              <button
                onClick={() => deleteStudent(selectedStudent._id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Delete Student
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}