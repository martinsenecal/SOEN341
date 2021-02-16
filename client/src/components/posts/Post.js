import React from 'react';
import UploadImage from './UploadImage';

const Post = () => {
  return (
    <div>
      <UploadImage />
      <button type="button" className="btn btn-primary" onClick={() => {}}>
        Upload Files
      </button>
    </div>
  );
};

export default Post;
