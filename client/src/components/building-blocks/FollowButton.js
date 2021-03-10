import axios from 'axios';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';

//default state depends on whether user is viewing the usertag of someone in their following list
//variable temporary. To be replaced when back end for adding/removing followers is connected

const FollowButton = ({ userId, extraClass }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [profileData, setProfileData] = useContext(ProfileContext);

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    let followed = false;
    for (let i = 0; i < auth.user.following.length; i++) {
      // will be wrong, authentication doesnt have the latest: maybe set Auth also?
      if (auth.user.following[i].user_id === userId) {
        followed = true;
        break;
      }
    }
    setIsFollowing(followed);
  }, [userId, auth.user.following]);

  const toggleFollowed = () => {
    console.log(userId);
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  const followUser = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/users/follow/${id}`, config);
      setAuth({
        ...auth,
        user: res.data[0],
      });
      setIsFollowing(!isFollowing);

      if (auth.user._id === profileData.profile._id) {
        // Profile of the Login User
        setProfileData({
          ...profileData,
          profile: res.data[0],
        });
      } else {
        setProfileData({
          ...profileData,
          profile: res.data[1],
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
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
      setAuth({
        ...auth,
        user: res.data[0],
      });

      setIsFollowing(!isFollowing);

      if (auth.user._id === profileData.profile._id) {
        // Profile of the Login User
        setProfileData({
          ...profileData,
          profile: res.data[0],
        });
      } else {
        setProfileData({
          ...profileData,
          profile: res.data[1],
        });
      }
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
