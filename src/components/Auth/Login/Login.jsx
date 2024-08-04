import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  let navigate = useNavigate();
  const [backEndData, setBackEndData] = useState([]);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  function getUserData(e) {
    let MyUser = { ...user };
    MyUser[e.target.name] = e.target.value;
    setUser(MyUser);
  }

  async function checkCredentials() {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setBackEndData(response.data);

      const foundUser = response.data.find(
        (u) => u.username === user.username && u.password === user.password
      );

      if (foundUser) {
        localStorage.setItem('userData', JSON.stringify(response.data));
        navigate('/profile');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Failed to connect to the server');
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    checkCredentials();
  }

  function handleGoToRegister() {
    navigate('/');
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={getUserData}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={getUserData}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="button" onClick={handleGoToRegister} className="register-button">
          Back to Register
        </button>
      </form>
    </div>
  );
}
