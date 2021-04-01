import React, { useRef, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import UploadImage from './UploadImage';
import { AuthContext } from '../../context/AuthContext';

const PostForm = () => {
  const [auth] = useContext(AuthContext);
  const uploadImageRef = useRef();
  const [error, setError] = useState(false);
  const [posted, setPosted] = useState(false);
  const [imageDescription, setImageDescription] = useState('');

  const handleUpload = async () => {
    const uploadedPath = await uploadImageRef.current.upload();

    if (uploadedPath != null) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const post = {
        user: auth.user,
        description: imageDescription,
        postedPicture: uploadedPath,
      };

      try {
        await axios.post('http://localhost:5000/api/feed', post, config);
        setPosted(true);
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  if (posted) {
    return <Redirect to="/feed" />;
  }
  return (
    <div className="postForm">
      <h5 className="formHeading">Upload a New Photo</h5>
      <div className="form-group">
        <label
          htmlFor="Description"
          style={{ marginLeft: '6.5%', fontSize: '15px' }}
        >
          Image Description
        </label>
        <textarea
          className="form-control input-lg image-description"
          id="description"
          placeholder="Enter Description"
          value={imageDescription}
          onChange={(e) => setImageDescription(e.target.value)}
        />
      </div>

      <UploadImage ref={uploadImageRef} />
      {error && (
        <p
          className="validationError"
          style={{ marginLeft: '6.95%', marginTop: '0.5em' }}
        >
          Image required
        </p>
      )}
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpload}
          style={{
            backgroundColor: '#3f51b5',
            borderColor: '#3f51b5',
            marginTop: '2em',
            width: '100px',
          }}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostForm;
