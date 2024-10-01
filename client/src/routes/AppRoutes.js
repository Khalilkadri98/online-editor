// src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import CodeEditor from '../components/CodeEditor';
import Services from '../pages/Services';

const AppRoutes = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
            <Route path="/" element={<CodeEditor />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/services" element={<Services />} />
        <Route path="/editor" element={token ? <CodeEditor /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
