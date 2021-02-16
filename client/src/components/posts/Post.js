import React, { useRef, useState } from 'react';
import UploadImage from './UploadImage';

const Post = () => {
  const uploadImageRef = useRef();

  const handleUpload = async () => {
    const uploadedPath = await uploadImageRef.current.upload();
    alert(uploadedPath);
  };
  return (
    <div>
      <UploadImage ref={uploadImageRef} />
      <button type="button" className="btn btn-primary" onClick={handleUpload}>
        Upload Files
      </button>
    </div>
  );
};

export default Post;
