import React from 'react';
import { useState } from 'react';

const FollowButton = ({ user, visiting }) => {
  //default state depends on whether profile's user is in logged-in user's "following" list (variable to be replaced)
  const [authUser, setAuthUser] = useState(visiting);

  const toggleFollowed = () => {
    setAuthUser((visiting.isFollowingUser = !visiting.isFollowingUser));
  };

  return (
    <button
      className={`follow-button btn ${
        visiting.isFollowingUser ? 'btn-outline-primary' : 'btn-primary'
      }`}
      onClick={toggleFollowed}
    >
      {visiting.isFollowingUser ? 'unfollow' : 'follow'}
    </button>
  );
};

export default FollowButton;
