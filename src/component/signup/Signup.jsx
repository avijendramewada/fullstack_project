import React, { useState } from 'react';
import './Signup.css'; // Make sure to create and use this CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Add your signup logic here
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
        .post('http://localhost:8000/user/signup', data, config)
        .then((response) => {
          console.log('resss', response.data);
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setEmail('');
          if (response?.data?.status == 201) {
            console.log('rrerere', response?.data?.status);
            toast.success(response?.data?.message, {
              position: "top-center"
            });
            // On successful login, redirect to the dashboard and pass email in state
            navigate('/dashboard', { state: { email: email } });
          } else if (response?.data?.status == 409) {
            setEmail(response?.data?.message);
            toast.warn(response?.data?.message, {
              position: "top-center"
            });
          }
        })
        .catch((error) => {
          console.error(error, 'rrrrrrrrrrrrrrrrrrr');
          setError('Wrong email or password!')
          toast.error("Error Notification !", {
            position: "top-left"
          });
        });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Signup
        </button>
        <p>Already have account <Link to={`/`}>Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
