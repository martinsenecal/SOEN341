import React from 'react';

const LikeButton = ({ liked }) => {
  if (liked) {
    return (
      <button className="like-button" onClick={console.log('clicked')}>
        <i className="fa fa-heart"></i>
      </button>
    );
  } else {
    return (
      <button className="like-button" onClick={console.log('clicked')}>
        <i className="fa fa-heart-o"></i>
      </button>
    );
  }
};

export default LikeButton;
