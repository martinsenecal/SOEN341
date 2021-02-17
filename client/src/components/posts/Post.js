import React, { useRef, useState } from 'react';
import UploadImage from './UploadImage';
import axios from 'axios';

const Post = () => {
  const uploadImageRef = useRef();

  const handleUpload = async () => {
    const uploadedPath = await uploadImageRef.current.upload();
    const post = {
      //postedBy:req.user
      description: 'test',
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
    alert(uploadedPath);
  };
  return (
    <div>
      <UploadImage ref={uploadImageRef} />

      <button type="button" className="btn btn-primary" onClick={handleUpload}>
        Post
      </button>
    </div>
  );
};

export default Post;
