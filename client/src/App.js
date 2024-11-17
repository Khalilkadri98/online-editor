// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Editor from "./components/CodeEditor";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
//import CodeEditor from './components/CodeEditor';
import Register from "./pages/Register";
import Services from "./pages/Services";
import Footer from "./components/layout/Footer";
import AboutUs from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProgress from "./components/UserProgress";
import QuizDetail from "./components/QuizDetail";
import QuizList from "./components/QuizList";
import TutorialList from "./components/tutorials/TutorialList";
import TutorialDetail from "./components/tutorials/TutorialDetail";
import TutorialManager from "./components/tutorials/TutorialManager";



const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Header /> {/* Always render Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/editor" element={<ProtectedRoute element={Editor} />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<QuizDetail />} />
        <Route path="/tutorials" element={<TutorialList />} />
        <Route path="/tutorials/:tutorialId" element={<TutorialDetail />} />
        <Route path="/manage-tutorials" element={<TutorialManager />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
