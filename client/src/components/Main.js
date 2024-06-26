import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Main() {
  const [email, setEmail] = useState("");
  const [password1, setpassword1] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    
    // Form data object in the specified format
    const formData = {
      email: email,
      password1: password1,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      // Redirect the user after successful login
      history.push('/home');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password1" placeholder="password1" onChange={(e) => setpassword1(e.target.value)} />
          <button type="submit">Login</button>
          <p className="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Main;
