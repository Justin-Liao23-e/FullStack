import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../services/api';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    };

    try {
      console.log('Attempting registration with:', { email, username });
      const response = await request('/register/', 'POST', userData);
      console.log('Registration response:', response);
      
      if (response.ok) {
        console.log('Registration successful');
        alert('Registration successful! You can now login.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        setError(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <form onSubmit={handleRegister}>
        <div>
          <label>First Name: </label>
          <input 
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required 
          />
        </div>
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
          <label>Username: </label>
          <input 
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;