import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Post from '../posts/Post';

const Landing = () => {
  const [auth] = useContext(AuthContext);

  return (
    <div>
      <h1>
        This is the landing Page! Just for testing.. We will not use this page.
      </h1>
      <h2>Here is the Auth (Global State)</h2>
      <p> isAuthenticated: {auth.isAuthenticated ? 'True' : 'False'}</p>
      <Post />
    </div>
  );
};

export default Landing;
