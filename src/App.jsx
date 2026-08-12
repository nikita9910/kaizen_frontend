import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Faculty from "./pages/Faculty";
import Contact from "./pages/Contact";

import Registration from "./pages/Registration";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";

import ManageFaculty from "./pages/ManageFaculty";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/faculty" element={<Faculty/>} />
        <Route path="/contact" element={<Contact/>} />

        <Route path="/registration" element={<Registration/>} />
        <Route path="/studentlogin" element={<StudentLogin/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/managefaculty" element={<ManageFaculty/>} />


      </Routes>

      <Footer />
    </>
  );
}

export default App;