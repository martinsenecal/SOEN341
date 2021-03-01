import React from 'react';
import {useState} from 'react';

const FollowButton = ({username, extraClass, visiting}) => {
  //default state depends on whether profile's user is in logged-in user's "following" list (variable 'visiting' to be replaced)
  const [authUser, setAuthUser] = useState(visiting);

  const toggleFollowed = () => {
    setAuthUser((visiting.isFollowingUser = !visiting.isFollowingUser));
    //add/remove 'username' from auth.user followee list.
  };

  return (
    <button
      className={`follow-button btn  ${extraClass} ${
        visiting.isFollowingUser ? 'btn-outline-primary' : 'btn-primary'
      }`}
      onClick={toggleFollowed}
    >
      {visiting.isFollowingUser ? 'unfollow' : 'follow'}
    </button>
  );
};

export default FollowButton;
