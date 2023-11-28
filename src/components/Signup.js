// components/Signup.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StreamChat } from 'stream-chat';
import { setDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase';

const Signup = ({ setAuthStatus }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const apiKey = process.env.REACT_APP_STREAM_API_KEY;
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Initialize StreamChat client
      const client = StreamChat.getInstance(apiKey);

      // Connect the user
      const user = await client.connectUser(
        {
          id: username,
          name: `${firstName} ${lastName}`,
          email,
          nickname,
          password,
        },
        client.devToken(username)
      );

      // Store user information in Firestore
      await setDoc(doc(firestore, 'Users', username), {
        id: username,
        name: `${firstName} ${lastName}`,
        email,
        nickname,
      });

      // Set authentication status to true
      setAuthStatus(true);

      // Redirect to home page or the desired route after successful signup
      navigate('/home');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Nickname:
        <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
