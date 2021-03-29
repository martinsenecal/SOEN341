import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import ImageCard from '../building-blocks/ImageCard';
import FollowButton from '../building-blocks/FollowButton';
import formatNumber from '../../utils/numberFormat';
import UserTag from '../building-blocks/UserTag';
import Spinner from '../building-blocks/Spinner';

import {AuthContext} from '../../context/AuthContext';
import {ProfileContext} from '../../context/ProfileContext';

const Profile = ({match}) => {
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
                        {formatNumber(profileData.profile.followers.length)}
                        <span className="text-muted"> followers </span>
                      </span>
                      <span
                        id="following-number"
                        className="ml-3"
                        data-toggle="modal"
                        data-target="#followingModal"
                        role="button"
                      >
                        {formatNumber(profileData.profile.following.length)}
                        <span className="text-muted"> following</span>
                      </span>
                    </h6>
                  </div>
                  <div>{/* <p>{profileData.profile.bio}</p> */}</div>
                  <div>
                    {
                      //display follow/unfollow button if user is not viewing their own profile
                      auth.user.username !== profileData.profile.username ? (
                        <FollowButton userId={profileData.profile._id} />
                      ) : (
                        <Link to="/editProfile" className="btn btn-primary">
                          Edit Profile
                        </Link>
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
                    {profileData.profile.followers.map((u) => (
                      <li key={u.username} className="user-list-item">
                        <UserTag
                          userId={u.user_id}
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
                    {profileData.profile.following.map((u) => (
                      <li key={u.username} className="user-list-item">
                        <UserTag
                          userId={u.user_id}
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
