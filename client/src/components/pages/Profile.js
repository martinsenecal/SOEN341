import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import ImageCard from '../building-blocks/ImageCard';
import FollowButton from '../building-blocks/FollowButton';
import formatNumber from '../../utils/numberFormat';
import Spinner from '../building-blocks/Spinner';

import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';

const Profile = ({ match }) => {
  const [auth] = useContext(AuthContext);
  const [profileData, setProfileData] = useContext(ProfileContext);

  useEffect(() => {
    const getProfile = async () => {
      await fetchProfile(match.params.username);
    };

    getProfile();
  }, [match.params.username]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchProfile = async (username) => {
    try {
      const resProfile = await axios.get(`/api/users/${username}`);
      const resPosts = await axios.get(`/api/users/posts/${username}`);
      setProfileData({
        ...profileData,
        profile: resProfile.data,
        posts: resPosts.data,
        loading: false,
      });
    } catch (err) {
      console.log('Error while fetching Profile');
    }
  };

  function getFollowButton(user) {
    if (user === auth.user.username) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => console.log('edit profile clicked')}
        >
          {' '}
          edit profile{' '}
        </button>
      );
    } else {
      return <FollowButton followed={false} />;
    }
  }

  return (
    <>
      {auth.loading ||
      auth.user === null ||
      profileData.loading ||
      profileData.profile === null ? (
        <Spinner />
      ) : (
        <>
          {' '}
          <div className="container">
            <div className="container" id="user-info">
              <div className="row align-items-center">
                <div className="col-4">
                  <div className="profile-photo-container">
                    <img
                      className="rounded-circle"
                      alt={profileData.profile.username}
                      src={profileData.profile.profilePicture}
                    />
                  </div>
                </div>
                <div className="col-8">
                  <div className="container p-4">
                    <div>
                      <h3>{profileData.profile.username}</h3>
                    </div>
                    <div>
                      <h6>
                        <span
                          id="follower-number"
                          onClick={() => console.log('follower span clicked')}
                        >
                          {formatNumber(profileData.profile.followerNumber)}{' '}
                          <span className="text-muted"> followers </span>
                        </span>
                        <span
                          id="following-number"
                          className="ml-3"
                          onClick={() => console.log('following span clicked')}
                        >
                          {formatNumber(profileData.profile.followingNumber)}{' '}
                          <span className="text-muted"> following</span>
                        </span>
                      </h6>
                    </div>
                    <div>{/* <p>{profileData.profile.bio}</p> */}</div>
                    <div>{getFollowButton(profileData.profile.username)}</div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {profileData.posts.length === 0 ? (
              <div>
                {
                  <p className="no-post-message">
                    {profileData.profile.username} has no posts
                  </p>
                }
              </div>
            ) : (
              <div id="photo-card-grid" className="container pt-5">
                <div className="row row-cols-1 row-cols-md-3">
                  {profileData.posts.map((photo, index) => (
                    <div key={index} className="col mb-4">
                      <ImageCard key={photo._id} photo={photo} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
