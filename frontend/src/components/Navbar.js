import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import request from '../services/api';

function Navbar({ isLoggedIn, isAdmin, setIsLoggedIn, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Make a POST request to /logout/
    await request('/logout/', 'POST');
    // Reset app states
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Redirect to /login
    navigate('/login');
  };

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      {!isLoggedIn && (
        <>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
      {isLoggedIn && (
        <>
          {isAdmin && (
            <div>
              <Link to="/admin">Admin Panel</Link>
            </div>
          )}
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;