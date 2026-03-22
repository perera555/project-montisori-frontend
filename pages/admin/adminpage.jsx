import Sidebar from "../../src/assets/components/sidebar";

export default function AdminPage({ user, logout }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar logout={logout} />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              📊 Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* USER INFO */}
          <div className="text-right">
            {user ? (
              <>
                <p className="font-semibold text-gray-800">
                  👤 {user.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

                <button
                  onClick={logout}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <p className="text-red-500 text-sm">
                ❌ No user logged in
              </p>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-blue-500">
            <h2>Total Students</h2>
            <p className="text-3xl font-bold">120</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-500">
            <h2>Teachers</h2>
            <p className="text-3xl font-bold">15</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-purple-500">
            <h2>Announcements</h2>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}