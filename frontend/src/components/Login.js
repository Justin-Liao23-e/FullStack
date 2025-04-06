import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../services/api';

function Login({ setIsLoggedIn, setIsAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Attempting login with:', { email });
      const response = await request('/login/', 'POST', { email, password });
      console.log('Login response:', response);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, data:', data);
        setIsLoggedIn(true);
        setIsAdmin(data.is_admin);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        setError(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
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