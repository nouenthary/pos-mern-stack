import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const API = process.env.REACT_APP_API_URL + '/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  const handleSave = async (user) => {
    if (user._id) {
      await axios.put(`${API}/${user._id}`, user);
    } else {
      await axios.post(API, user);
    }
    setEditingUser(null);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
      <div className="App">
        <h1>User Management</h1>
        <UserForm user={editingUser} onSave={handleSave} />
        <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
      </div>
  );
}

export default App;
