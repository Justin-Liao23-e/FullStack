import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../services/api';

function Login({ setIsLoggedIn, setIsAdmin }) {
  // State for the form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to /login/ with email + password
      const response = await request('/login/', 'POST', { email, password });
      if (response.ok) {
        const data = await response.json();
        // If successful, store the login status in state
        setIsLoggedIn(true);
        setIsAdmin(data.is_admin);
        // Navigate to home
        navigate('/');
      } else {
        // If the server responded with an error
        const errorData = await response.json();
        alert(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Password: </label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;