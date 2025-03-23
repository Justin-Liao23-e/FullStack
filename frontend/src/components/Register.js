import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../services/api';

function Register() {
  // Local state for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Prepare data to be sent in POST
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    };

    try {
      const response = await request('/register/', 'POST', userData);
      if (response.ok) {
        alert('Registration successful! You can now login.');
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
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