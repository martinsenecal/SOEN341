import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import UploadImage from '../posts/UploadImage';
import Spinner from '../building-blocks/Spinner';

import { AuthContext } from '../../context/AuthContext';

//Make Name required, and profile pic also... or if no pic, then default pic.
const EditProfile = ({ match }) => {
  const [auth] = useContext(AuthContext);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const getUser = async () => {
      await fetchUser();
    };
    getUser();
  }, [auth.user]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/users/${auth.user.username}`);
      const resData = res.data;
      setName(resData.name);
      setBio(resData.bio);
      setProfilePicture(resData.profilePicture);
    } catch (err) {
      console.log('Error while fetching User');
    }
  };

  const handleUploadModification = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const modification = {
      username: auth.user.username,
      name: name,
      bio: bio,
      profilePicture: profilePicture,
    };

    try {
      await axios.put(
        'http://localhost:5000/api/users/settings',
        modification,
        config
      );

      console.log('done');
    } catch (error) {
      //setError(true);
      console.log('Error while saving modification...');
    }
  };

  return (
    <>
      {auth.loading || auth.user === null ? (
        <Spinner />
      ) : (
        <div className="container mt-5">
          <form>
            <div id="edit-pic" className="row">
              <label className="col-sm-2 col-form-label">
                <strong>Profile picture</strong>
              </label>
              <div className="edit-profile-photo-container">
                <img src={profilePicture} alt="Profile" />
              </div>
              <div id="pic-edit-icons">
                <span
                  id="edit-photo-icon"
                  className="ml-3"
                  data-toggle="modal"
                  data-target="#edit-photo-modal"
                  role="button"
                >
                  <i className="fa fa-pencil"></i>
                </span>
                <span
                  id="delete-photo-icon"
                  className="ml-3"
                  data-toggle="modal"
                  data-target="#delete-photo-modal"
                  role="button"
                >
                  <i className="fa fa-trash-o"></i>
                </span>
              </div>
            </div>
            {/* Portion of form for editing Name and bio*/}
            <div id="edit-profile-form" className="form-group row">
              <label className="col-sm-2 col-form-label">
                <strong>Name</strong>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">
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
            <button
              type="button"
              onClick={handleUploadModification}
              className="btn btn-primary float-right"
            >
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
