import React, { useRef, useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import UploadImage from '../posts/UploadImage';
import Spinner from '../building-blocks/Spinner';

import { AuthContext } from '../../context/AuthContext';

const EditProfile = () => {
  const [auth] = useContext(AuthContext);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const uploadImageRef = useRef();
  const [error, setError] = useState(false);
  const [posted, setPosted] = useState(false);

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
      setProfilePic(resData.profilePicture);
    } catch (err) {
      console.log('Error while fetching User');
    }
  };

  const handleUploadModification = async () => {
    let profileLink = await uploadImageRef.current.upload();
    if (profileLink == null) {
      profileLink = profilePic;
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const modification = {
      username: auth.user.username,
      name: name,
      bio: bio,
      profilePicture: profileLink,
    };

    try {
      await axios.put(
        'http://localhost:5000/api/users/settings',
        modification,
        config
      );

      setPosted(true);
    } catch (error) {
      if (error.response.data.errors[0].msg === 'Name is required') {
        setError(true);
      }
      console.log('Error while saving modification...');
    }
  };

  if (posted) {
    return <Redirect to={`/profile/${auth.user.username}`} />;
  }

  return (
    <>
      {auth.loading || auth.user === null ? (
        <Spinner />
      ) : (
        <div className="postForm mt-5">
          <h5 className="formHeading">Edit Profile</h5>
          <form>
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
                {error && <p className="validationError">Name required</p>}
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
          </form>

          <div className="flex-container">
            <div
              id="edit-pic flex-child one"
              className="row"
              style={{ width: '152px' }}
            >
              <label style={{ paddingLeft: '40px', marginBottom: '0px' }}>
                <strong>Profile Picture</strong>
              </label>
              <div className="flex-child two edit-profile-photo-container">
                <img className="profile-image" src={profilePic} alt="Profile" />
              </div>
            </div>

            <div className="flex-child three" style={{ paddingLeft: '24px' }}>
              <UploadImage ref={uploadImageRef} />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleUploadModification}
              className="btn btn-primary float-right"
              style={{
                marginTop: '2em',
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
