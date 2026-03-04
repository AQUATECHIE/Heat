import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    const token = localStorage.getItem("token");

    try {
      await api.put(
        `/admin/users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.error("Failed to update role");
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/users/${selectedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteModal(false);
      setSelectedUser(null);

      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user");
    }
  };

  return (
    <div className="admin-users">
      <h2>Registered Users</h2>

      <div className="users-table">
        <div className="users-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>

        {users.map((user) => (
          <div key={user._id} className="users-row">
            <span>{user.name}</span>
            <span>{user.email}</span>

            <span>
              <select
                value={user.role}
                onChange={(e) =>
                  updateRole(user._id, e.target.value)
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </span>

            <span>
              <button
                className="delete-user-btn"
                onClick={() => openDeleteModal(user)}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Delete User</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedUser?.name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={deleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;