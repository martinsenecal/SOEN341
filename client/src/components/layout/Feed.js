import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Feed = () => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      {auth.loading || auth.user === null ? (
        <div>Loading...</div>
      ) : (
        <>
          {' '}
          <h1>This is the feed! Wohoooo!</h1>
          <h2>Your username is: {auth.user.username}</h2>
        </>
      )}
    </>
  );
};

export default Feed;
