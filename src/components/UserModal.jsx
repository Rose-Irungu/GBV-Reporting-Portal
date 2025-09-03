import { useState, useEffect } from "react";
import {
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";

export function UserModal({ isOpen, onClose, type, user, onSave, onDelete, loading }) {
  const [editedUser, setEditedUser] = useState(user || {});

  useEffect(() => {
    setEditedUser(user || {});
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {type === "view" && (
          <>
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {user.first_name} {user.last_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone_number}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Status:</strong> {user.is_active ? "Active" : "Inactive"}
            </p>
          </>
        )}

        {type === "edit" && (
          <>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={editedUser.first_name}
                  onChange={(e) => setEditedUser({ ...editedUser, first_name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={editedUser.last_name}
                  onChange={(e) => setEditedUser({ ...editedUser, last_name: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  value={editedUser.phone_number}
                  onChange={(e) => setEditedUser({ ...editedUser, phone_number: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="survivor">Survivor</option>
                  <option value="counselor">Counselor</option>
                  <option value="doctor">Doctor</option>
                  <option value="lawyer">Lawyer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:shadow"
                disabled={loading}
              >
                Save Changes
              </button>
            </form>
          </>
        )}

        {type === "delete" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete User</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>
                {user.first_name} {user.last_name}
              </strong>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(user.id)}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function UsersManagement({ Users }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (type, user) => {
    setModalType(type);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handleSave = (updatedUser) => {
    console.log("Save user", updatedUser);
    closeModal();
  };

  const handleDelete = (userId) => {
    console.log("Delete user", userId);
    closeModal();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(Users || []).map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  {user.is_active ? (
                    <UserCheck className="w-4 h-4 text-green-600 inline" />
                  ) : (
                    <UserX className="w-4 h-4 text-red-600 inline" />
                  )}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => openModal("view", user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal("edit", user)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal("delete", user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <UserModal
        isOpen={!!modalType}
        onClose={closeModal}
        type={modalType}
        user={selectedUser}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
