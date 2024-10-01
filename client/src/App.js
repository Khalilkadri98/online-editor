// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Editor from './components/CodeEditor';
import Home from './pages/Home';
import Header from './components/layout/Header';
import CodeEditor from './components/CodeEditor';
import Register from './pages/Register';
import Services from './pages/Services';
import Footer from './components/layout/Footer';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Header /> {/* Always render Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editor" element={token ? <Editor /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;