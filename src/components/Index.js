// components/Index.js

import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <h1>Welcome to WeListen!</h1>
      <p>
        WeListen is a platform where you can connect with others and share your thoughts on music.
      </p>
      <p>
        Join our community and start discovering new experiences together!
      </p>
      <div>
        {/* Add login and sign-up buttons with links */}
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
