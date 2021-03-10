import axios from 'axios';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';

//default state depends on whether user is viewing the usertag of someone in their following list
//variable temporary. To be replaced when back end for adding/removing followers is connected

const FollowButton = ({ userId, extraClass }) => {
  const [auth] = useContext(AuthContext);
  const [profileData, setProfileData] = useContext(ProfileContext);

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let followed = false;
    for (let i = 0; i < auth.user.following.length; i++) {
      if (auth.user.following[i].user_id === userId) {
        followed = true;
        break;
      }
    }
    setIsFollowing(followed);
  }, []);

  const toggleFollowed = () => {
    console.log(userId);
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
    setIsFollowing(!isFollowing);
  };

  const followUser = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/users/follow/${id}`, config);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errors[0].msg); // => the response payload
      }
    }
  };

  const unfollowUser = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.delete(`/api/users/follow/${id}`, config);
      console.log(res);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.errors[0].msg); // => the response payload
      }
    }
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
