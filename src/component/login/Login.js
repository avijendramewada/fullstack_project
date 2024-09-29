import React, { useState } from 'react';
import './Login.css'; // Make sure to create and use this CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        email: email,
        password: password,
      };

      axios
        .post('http://localhost:8000/user/login', data, config)
        .then((response) => {
          if (response?.data?.status == 200) {
            toast.success(response?.data?.message, {
              position: "top-center"
            });
            // On successful login, redirect to the dashboard and pass email in state
            navigate('/dashboard', { state: { email: email } });
          } else if (response?.data?.status == 409) {
            toast.warn(response?.data?.message, {
              position: "top-center"
            });
          }
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.error(error);
          setError('wrong email or password!');
          toast.error('wrong email or password!', {
            position: "top-center"
          });
        });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
        <p>I don't have account? <Link to={`/signup`}>Sign up</Link></p>
      </form>
    </div>
  );
};

export default Login;
