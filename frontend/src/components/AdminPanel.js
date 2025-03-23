import React, { useState, useEffect } from 'react';
import request from '../services/api';

function AdminPanel() {
  // Store all users
  const [users, setUsers] = useState([]);
  // The user ID we might delete
  const [targetUserId, setTargetUserId] = useState('');
  // The post ID we might remove
  const [targetPostId, setTargetPostId] = useState('');

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // GET /admin-panel/
    const response = await request('/admin-panel/');
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      alert('Failed to fetch users or unauthorized');
    }
  };

  // Delete a user by ID
  const handleDeleteUser = async () => {
    if (!window.confirm(`Delete user with ID ${targetUserId}?`)) return;
    const response = await request(`/admin-panel/${targetUserId}/`, 'DELETE');
    if (response.ok) {
      alert('User deleted');
      fetchUsers();
    } else {
      alert('Deletion failed');
    }
  };

  // Remove a post by ID
  const handleRemovePost = async () => {
    if (!window.confirm(`Remove post with ID ${targetPostId}?`)) return;
    const response = await request(`/admin-remove-post/${targetPostId}/`, 'DELETE');
    if (response.ok) {
      alert('Post removed');
    } else {
      alert('Post removal failed');
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <h3>All Users</h3>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.id} - {u.username} - {u.email} ({u.first_name} {u.last_name})
          </li>
        ))}
      </ul>

      {/* Delete user section */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Delete a User</h3>
        <input
          type="text"
          placeholder="User ID"
          value={targetUserId}
          onChange={e => setTargetUserId(e.target.value)}
        />
        <button onClick={handleDeleteUser}>Delete User</button>
      </div>

      {/* Remove post section */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Remove a Post</h3>
        <input
          type="text"
          placeholder="Post ID"
          value={targetPostId}
          onChange={e => setTargetPostId(e.target.value)}
        />
        <button onClick={handleRemovePost}>Remove Post</button>
      </div>
    </div>
  );
}

export default AdminPanel;