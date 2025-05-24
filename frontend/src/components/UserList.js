import React from 'react';

function UserList({ users, onEdit, onDelete }) {
    return (
        <ul>
            {users.map((user) => (
                <li key={user._id}>
                    {user.name} ({user.email})
                    <button onClick={() => onEdit(user)}>Edit</button>
                    <button onClick={() => onDelete(user._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default UserList;
