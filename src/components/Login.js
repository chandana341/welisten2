// components/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StreamChat } from 'stream-chat';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';

const Login = ({ setAuthStatus }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const apiKey = process.env.REACT_APP_STREAM_API_KEY;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Fetch user credentials from Firestore
      const userDoc = await getDoc(doc(firestore, 'Users', username));
      const userData = userDoc.data();

      if (!userData) {
        console.error('User not found.');
        return;
      }

      // Initialize StreamChat client
      const client = StreamChat.getInstance(apiKey);

      // Connect the user
      await client.connectUser(
        { id: username, password },
        client.devToken(username)
      );

      // Set authentication status to true
      setAuthStatus(true);

      // Redirect to home page or the desired route after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
