import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MasterLayout from './components/MasterLayout';
import Users from './pages/Users';
import Roles from './pages/Roles';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MasterLayout />}>
                <Route path="users" element={<Users />} />
                <Route path="roles" element={<Roles />} />
            </Route>
        </Routes>
    );
}

export default App;
