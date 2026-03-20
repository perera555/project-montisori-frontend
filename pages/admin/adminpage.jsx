import Sidebar from "../../src/assets/components/sidebar";

export default function AdminPage() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            📊 Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Students */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-blue-500">
            <h2 className="text-gray-600 font-medium">
              Total Students
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              120
            </p>
          </div>

          {/* Teachers */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-green-500">
            <h2 className="text-gray-600 font-medium">
              Teachers
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              15
            </p>
          </div>

          {/* Announcements */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border-l-4 border-purple-500">
            <h2 className="text-gray-600 font-medium">
              Announcements
            </h2>
            <p className="text-3xl font-bold text-gray-800 mt-2">
              5
            </p>
          </div>

        </div>

        {/* Extra Section (Optional modern touch) */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              📌 Recent Activity
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• New student registered</li>
              <li>• Gallery updated</li>
              <li>• Announcement posted</li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              ⚡ Quick Actions
            </h3>

            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                + Add Student
              </button>

              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition">
                + Upload Gallery
              </button>

              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition">
                + Add Announcement
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}