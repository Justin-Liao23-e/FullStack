import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';

import './App.css';

/*
  App component:
   - Holds global states: isLoggedIn, isAdmin
   - Defines routes for the application
   - Renders the Navbar at the top
*/
function App() {
  // Track if a user is logged in, and if they are admin
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      {/* The Navbar is always visible, passing props to let it handle logout */}
      <Navbar 
        isLoggedIn={isLoggedIn} 
        isAdmin={isAdmin} 
        setIsLoggedIn={setIsLoggedIn} 
        setIsAdmin={setIsAdmin} 
      />

      {/* Define the routes using react-router-dom */}
      <Routes>
        {/* 
          Home route:
           - If not logged in, redirect to /login
           - If logged in, show Home component
        */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Login route */}
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setIsAdmin={setIsAdmin}
            />
          }
        />

        {/* Registration route */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin route:
            Only accessible if user is logged in AND isAdmin is true,
            otherwise redirect to Home (/).
        */}
        <Route
          path="/admin"
          element={
            isLoggedIn && isAdmin ? <AdminPanel /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;