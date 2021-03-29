import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';

import {AuthContext} from '../../context/AuthContext';
import UploadImage from '../posts/UploadImage';
import Spinner from '../building-blocks/Spinner';

const EditProfile = ({match}) => {
  const [auth] = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    setUsername(auth.user.username);
    setBio(auth.user.bio);
    setProfilePicture(auth.user.profilePicture);
  }, [auth.user]);

  return (
    <>
      {auth.loading || auth.user === null ? (
        <Spinner />
      ) : (
        <div className="container mt-5">
          <form>
            <div id="edit-pic" className="row">
              <label for="profilePic" className="col-sm-2 col-form-label">
                <strong>Profile picture</strong>
              </label>
              <div className="edit-profile-photo-container">
                <img src={profilePicture} />
              </div>
              <div id="pic-edit-icons">
                <span
                  id="edit-photo-icon"
                  className="ml-3"
                  data-toggle="modal"
                  data-target="#edit-photo-modal"
                  role="button"
                >
                  <i class="fa fa-pencil"></i>
                </span>
                <span
                  id="delete-photo-icon"
                  className="ml-3"
                  data-toggle="modal"
                  data-target="#delete-photo-modal"
                  role="button"
                >
                  <i class="fa fa-trash-o"></i>
                </span>
              </div>
            </div>
            {/* Portion of form for editing username and bio*/}
            <div id="edit-profile-form" className="form-group row">
              <label for="username" className="col-sm-2 col-form-label">
                <strong>Username</strong>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="bio" className="col-sm-2 col-form-label">
                <strong>Bio</strong>
              </label>
              <div className="col-sm-10">
                <textarea
                  type="text"
                  className="form-control"
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
            <button type="button" className="btn btn-primary float-right">
              Save changes
            </button>
          </form>

          {/*Modal for selecting a photo*/}
          <div
            className="modal fade"
            id="edit-photo-modal"
            tabIndex="-1"
            aria-labelledby="editPhotoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="followingModalLabel">
                    Select a photo
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
                  <UploadImage />
                </div>
              </div>
            </div>
          </div>

          {/*Modal for deleting a photo*/}
          <div
            className="modal fade"
            id="delete-photo-modal"
            tabIndex="-1"
            aria-labelledby="deletePhotoModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="followingModalLabel">
                    Delete your profile photo
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
                  <p>Are you sure you want to delete the photo?</p>
                  <button className="btn btn-primary">yes</button>{' '}
                  <button
                    className="btn btn-light"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
