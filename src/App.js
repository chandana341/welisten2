// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ChatContainer from './components/ChatContainer';
import Login from './components/Login';
import Signup from './components/Signup';
import Index from './components/Index';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { ChatProvider } from './contexts/ChatContext'; // Import ChatProvider

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set authentication status
  const setAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            {/* Redirect to login if not authenticated */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login setAuthStatus={setAuthStatus} />} />
            <Route path="/signup" element={<Signup setAuthStatus={setAuthStatus} />} />
            <Route path="/group/:groupId" element={<ChatContainer />} />
            <Route path="/index" element={<Index />} />
            {/* Add other routes as needed */}
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
