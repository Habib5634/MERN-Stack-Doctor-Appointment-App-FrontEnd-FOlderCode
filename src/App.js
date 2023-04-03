import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import { useSelector } from 'react-redux';
import Spinner from './Components/Spinner';
import ProtectedRoute from './Components/ProtectedRoutes'
import PublicRoute from "./Components/publicRoute"
import ApplyDoctor from './Pages/ApplyDoctor';
import NotificationPage from './Pages/NotificationPage';
import Users from './Pages/Admin/Users';
import Doctors from './Pages/Admin/Doctors';
import Profile from './Pages/Doctor/Profile';
import BookingPage from './Pages/BookingPage';
import Appointments from './Pages/Appointments';
import DoctorAppointments from './Pages/Doctor/DoctorAppointments';

function App() {
  const { loading } = useSelector(state => state.alert)
  return (
    <>

      <BrowserRouter>
        {loading ? (<Spinner />) : (
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/apply-doctors" element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/doctor/book-appointment/:doctorId" element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/doctors" element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />
            <Route path="/doctor/profile/:id" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/notification" element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            } />
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/doctor-appointments" element={
              <ProtectedRoute>
                <DoctorAppointments />
              </ProtectedRoute>
            } />
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
          </Routes>
        )}

      </BrowserRouter>
    </>
  );
}

export default App;
