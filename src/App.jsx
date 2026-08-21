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

// Admin
import ManageAssignments from "./pages/ManageAssignments";
import ManageAttendance from "./pages/ManageAttendance";
import ManageBatches from "./pages/ManageBatches";
import MangeCourses from "./pages/ManageCourses";
import ManageExams from "./pages/ManageExams";
import ManageFaculty from "./pages/ManageFaculty";
import ManageFeedback from "./pages/ManageFeedback";
import ManageFees from "./pages/ManageFees";
import ManageNotices from "./pages/ManageNotices";
import ManageStudents from "./pages/ManageStudents";
import ManageStudyMaterial from "./pages/ManageStudyMaterial";

//dashboard
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

//student



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

        {/* admin */}
        <Route path="/managefaculty" element={<ManageFaculty/>} />
        <Route path="/manageassignments" element={<ManageAssignments/>} />
        <Route path="/manageattendance" element={<ManageAttendance/>} />
        <Route path="/managebatches" element={<ManageBatches/>} />
        <Route path="/managecourses" element={<ManageBatches/>} />
        <Route path="/manageexams" element={<ManageExams/>} />
        <Route path="/managefees" element={<ManageFees/>} />
        <Route path="/managefeedback" element={<ManageFeedback/>} />
        <Route path="/managenotices" element={<ManageNotices/>} />
        <Route path="/managestudents" element={<ManageStudents/>} />
        <Route path="/managestudymaterial" element={<ManageStudyMaterial/>} />


        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />


        {/* <Route path="/student-courses" element={<MyCourses />} />
        <Route path="/student-attendance" element={<Attendance />} />
        <Route path="/student-material" element={<StudyMaterial />} />
        <Route path="/student-assignments" element={<Assignments />} />
        <Route path="/student-exams" element={<OnlineExam />} />
        <Route path="/student-results" element={<Results />} />
        <Route path="/student-fees" element={<Fees />} />
        <Route path="/student-profile" element={<Profile />} /> */}
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;