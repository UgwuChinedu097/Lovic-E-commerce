import { useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../service/UserApi"; // Adjust path as needed
import { clearNotifications } from "../service/NotificationSlice";
import { useDispatch } from "react-redux";


export default function UsersPage() {
  const { data, isLoading, isError } = useGetAllUsersQuery();
  const users = data?.allUser || [];
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const filteredUsers = users.filter((user) =>
    [user.firstName, user.lastName, user.email]
      .some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
  );

    useEffect(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="py-16 text-center text-gray-500 text-lg">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 text-center text-red-600 text-lg">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-black">All Registered Users</h1>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-amber-50 transition">
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-gray-500 text-sm">
            No users match your search.
          </div>
        )}
      </div>

    
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow rounded-xl p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-black">
                {user.firstName} {user.lastName}
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  user.role === "admin"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="text-sm text-gray-700">
              <p>Email: {user.email}</p>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-sm text-gray-500">
            No users match your search.
          </div>
        )}
      </div>
    </div>
  );
}
