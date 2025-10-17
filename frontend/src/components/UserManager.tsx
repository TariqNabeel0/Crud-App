import React, { useState, useEffect, useCallback } from 'react';
import { useLogto } from '@logto/react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManager: React.FC = () => {
  const { isAuthenticated, signIn, signOut } = useLogto();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api` : 'http://localhost:8080/api';

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated, fetchUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      setLoading(true);
      if (editingId) {
        // Update user
        const response = await axios.put(`${API_BASE_URL}/users/${editingId}`, formData);
        setUsers(users.map(user => user.id === editingId ? response.data : user));
        setEditingId(null);
      } else {
        // Create user
        const response = await axios.post(`${API_BASE_URL}/users`, formData);
        setUsers([...users, response.data]);
      }
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setFormData({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', email: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <h2>Please sign in to access the application</h2>
        <button onClick={() => signIn('http://localhost:3000/callback')}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="user-manager">
      <div className="auth-header">
        <h2>User Management</h2>
        <button onClick={() => signOut('http://localhost:3000')}>
          Sign Out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        <h3>{editingId ? 'Edit User' : 'Add New User'}</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update User' : 'Add User'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="users-list">
        <h3>Users</h3>
        {loading && <p>Loading...</p>}
        {users.length === 0 && !loading ? (
          <p>No users found. Add some users to get started.</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
                <div className="user-actions">
                  <button onClick={() => handleEdit(user)} disabled={loading}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} disabled={loading}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;