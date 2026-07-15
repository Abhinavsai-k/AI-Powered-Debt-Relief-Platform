import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

import UserForm from "../components/forms/UserForm";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        alert("User updated successfully!");
      } else {
        await createUser(formData);
        alert("User created successfully!");
      }

      setEditingUser(null);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Operation failed.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  if (loading) {
    return <h2>Loading Users...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 Users</h1>

      <UserForm
        onSubmit={handleSubmit}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#2563EB", color: "#fff" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Users Found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "10px" }}>{user.id}</td>

                <td style={{ padding: "10px" }}>
                  {user.name}
                </td>

                <td style={{ padding: "10px" }}>
                  {user.email}
                </td>

                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => setEditingUser(user)}
                    style={{
                      marginRight: "10px",
                      background: "#F59E0B",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{
                      background: "#EF4444",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Users;