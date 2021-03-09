import {set} from 'mongoose';
import React, {useContext} from 'react';
import {useState} from 'react';

import {AuthContext} from '../../context/AuthContext';

//default state depends on whether user is viewing the usertag of someone in their following list
//variable temporary. To be replaced when back end for adding/removing followers is connected
var followed = false;

const FollowButton = ({username, extraClass}) => {
  const [auth] = useContext(AuthContext);

  for (var i = 0; i < auth.user.following.length; i++)
    followed = auth.user.following[i].username === username ? true : false;

  const [isFollowing, setIsFollowing] = useState(followed);

  const toggleFollowed = () => {
    //add/remove 'username' from auth.user followee list.
    followed = !followed;
    setIsFollowing(followed);
  };

  return (
    <button
      className={`follow-button btn  ${extraClass} ${
        isFollowing ? 'btn-outline-primary' : 'btn-primary'
      }`}
      onClick={toggleFollowed}
    >
      {isFollowing ? 'unfollow' : 'follow'}
    </button>
  );
};

export default FollowButton;
