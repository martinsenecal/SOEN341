import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <div>
      <h1>This is the feed! Wohoooo!</h1>
    </div>
  );
};

export default Feed;
