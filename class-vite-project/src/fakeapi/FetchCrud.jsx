import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function FetchCrud() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Create or Update user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      fetch(`http://localhost:5000/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, username }),
      })
        .then((res) => res.json())
        .then((updated) => {
          setUsers(users.map((u) => (u.id === editId ? updated : u)));
          setEditId(null);
          setUsername("");
        });
    } else {
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })
        .then((res) => res.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
          setUsername("");
        });
    }
  };

  // Delete user
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" }).then(() =>
      setUsers(users.filter((u) => u.id !== id)),
    );
  };

  // Edit user
  const handleEdit = (user) => {
    setEditId(user.id);
    setUsername(user.username);
  };
  return (
    <div className="container mt-4">
      <h2>User CRUD</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            {editId ? "Update User" : "Add User"}
          </button>
        </div>
      </form>

      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.username}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchCrud;
