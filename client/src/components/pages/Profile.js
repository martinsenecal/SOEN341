import React, {useContext, useEffect} from 'react';
import axios from 'axios';

import ImageCard from '../building-blocks/ImageCard';
import FollowButton from '../building-blocks/FollowButton';
import formatNumber from '../../utils/numberFormat';
import UserTag from '../building-blocks/UserTag';
import Spinner from '../building-blocks/Spinner';

import {AuthContext} from '../../context/AuthContext';
import {ProfileContext} from '../../context/ProfileContext';

//Hard-coded list of users to test follower/following lists
const users = [
  {
    profilePicture:
      'https://images.unsplash.com/photo-1613140952277-1c6bd0386ff5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
    username: 'example02',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1543255006-d6395b6f1171?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
    username: 'example03',
  },
  {
    profilePicture:
      'https://images.unsplash.com/photo-1591160690555-5debfba289f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    username: 'example04',
  },
];

const Profile = ({match}) => {
  const [auth] = useContext(AuthContext);
  const [profileData, setProfileData] = useContext(ProfileContext);

  //hard-coded example of the user who is viewing the profile. (eventually auth.user)
  const visitingUser = {
    username: auth.username,
    isFollowingUser: true,
  };

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
  return (
    <>
      {auth.loading ||
      auth.user === null ||
      profileData.loading ||
      profileData.profile === null ? (
        <Spinner />
      ) : (
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
                        data-toggle="modal"
                        data-target="#followerModal"
                        role="button"
                      >
                        {formatNumber(profileData.profile.followerNumber)}
                        <span className="text-muted"> followers </span>
                      </span>
                      <span
                        id="following-number"
                        className="ml-3"
                        data-toggle="modal"
                        data-target="#followingModal"
                        role="button"
                      >
                        {formatNumber(profileData.profile.followingNumber)}
                        <span className="text-muted"> following</span>
                      </span>
                    </h6>
                  </div>
                  <div>{/* <p>{profileData.profile.bio}</p> */}</div>
                  <div>
                    {
                      //to be replace with auth.user and user who's profile it is (visiting user will not need to be passed)
                      //*****AAAA FIX THIS! */
                      auth.user.username !== profileData.profile.username ? (
                        <FollowButton
                          username={profileData.profile.username}
                          visiting={visitingUser}
                        />
                      ) : (
                        ''
                      )
                    }
                  </div>
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
          <div
            className="modal fade"
            id="followerModal"
            tabIndex="-1"
            aria-labelledby="followerModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="followerModalLabel">
                    Followers
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="user-list">
                    {users.map((u) => (
                      <li key={u.username} className="user-list-item">
                        <UserTag
                          profilePicture={u.profilePicture}
                          username={u.username}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="followingModal"
            tabIndex="-1"
            aria-labelledby="followingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="followingModalLabel">
                    Following
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="user-list">
                    {users.map((u) => (
                      <li key={u.username} className="user-list-item">
                        <UserTag
                          profilePicture={u.profilePicture}
                          username={u.username}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
