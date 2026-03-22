import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ FIXED: use backend from .env
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/students`,
});

export default function Student() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const getStudents = async () => {
    try {
      const res = await api.get("/");
      console.log(res.data);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg">

        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800">
          🎓 Student Management
        </h2>

        {user?.role === "admin" && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/admin/students/add")}
              className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-2 rounded-xl shadow-md"
            >
              ➕ Add Student
            </button>
          </div>
        )}

        {students.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No students found
          </p>
        ) : (
          <div className="space-y-4">
            {students.map((s) => (
              <div
                key={s._id}
                className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <p className="font-semibold text-lg text-gray-800">
                  {s.name}
                </p>

                <p className="text-gray-600 mt-1">
                  Age: <span className="font-medium">{s.age}</span>
                </p>

                {user?.role === "admin" && (
                  <button
                    onClick={() =>
                      navigate(`/admin/students/update/${s._id}`)
                    }
                    className="mt-3 bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-1.5 rounded-lg shadow-sm"
                  >
                    ✏️ Update
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}