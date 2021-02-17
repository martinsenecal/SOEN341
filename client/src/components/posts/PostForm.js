import React, { useRef, useState } from 'react';
import axios from 'axios';

import UploadImage from './UploadImage';

const PostForm = () => {
  const uploadImageRef = useRef();
  const [error, setError] = useState(false);
  const [imageDescription, setImageDescription] = useState('');

  const handleUpload = async () => {
    const uploadedPath = await uploadImageRef.current.upload();
    const post = {
      //postedBy:req.user
      description: imageDescription,
      postedPicture: uploadedPath,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify();
    const res = await axios.post(
      'http://localhost:5000/api/feed',
      post,
      config
    );
    if (error.response) {
      setError(true);
    }
    console.log(uploadedPath);
    console.log(`Image description: ${imageDescription}`);
  };
  return (
    <div class="postForm">
      <h5
        style={{
          textAlign: 'center',
          marginTop: '0.5em',
          marginBottom: '1em',
        }}
      >
        Upload a New Photo
      </h5>
      <div class="form-group">
        <label
          for="Description"
          style={{ marginLeft: '6.5%', fontSize: '15px' }}
        >
          Image Description
        </label>
        <input
          type="description"
          class="form-control input-lg image-description"
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
          style={{ marginLeft: '5.5%', marginTop: '0.5em' }}
        >
          Image required
        </p>
      )}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleUpload}
        style={{
          backgroundColor: '#3f51b5',
          borderColor: '#3f51b5',
          marginTop: '2em',
          width: '100px',
          marginLeft: '45%', //Needs to be fixed.
        }}
      >
        Post
      </button>
    </div>
  );
};

export default PostForm;
