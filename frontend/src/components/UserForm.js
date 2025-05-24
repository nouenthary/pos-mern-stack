import React, { useState, useEffect } from 'react';

function UserForm({ user, onSave }) {
    const [form, setForm] = useState({ name: '', email: '' });

    useEffect(() => {
        if (user) setForm(user);
    }, [user]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        setForm({ name: '', email: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
            <button type="submit">Save</button>
        </form>
    );
}

export default UserForm;
