import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await axios.get("http://localhost:5000/api/admin/admins", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins(res.data.admins || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete admin
  const deleteAdmin = async (id) => {
    const yes = window.confirm("Are you sure you want to delete this admin?");
    if (!yes) return;

    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(`http://localhost:5000/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove admin from UI
      setAdmins((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete admin");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Accounts</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : admins.length === 0 ? (
        <p className="text-center text-gray-500">No admins found.</p>
      ) : (
        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="w-full bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex justify-between items-center"
            >
              {/* LEFT SIDE */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {admin.name}
                </h3>
                <p className="text-sm text-gray-600">{admin.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(admin.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs mt-1 font-semibold">
                  Role:{" "}
                  <span
                    className={
                      admin.role === "super-admin"
                        ? "text-purple-600"
                        : "text-blue-600"
                    }
                  >
                    {admin.role}
                  </span>
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div>
                {/* HIDE DELETE BUTTON FOR SUPER ADMIN */}
                {admin.role !== "super-admin" ? (
                  <button
                    onClick={() => deleteAdmin(admin._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 text-sm">
                    Protected
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminList;
