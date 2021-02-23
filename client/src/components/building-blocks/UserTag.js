import React from 'react';
import { Link } from 'react-router-dom';

const UserTag = ({ username, profilePicture }) => {
  return (
    <Link to={'/profile/' + username}>
      <div className="row align-items-center">
        <div className="col-xs-auto profile-picture-col">
          <div className="card-profile-picture-container ml-3">
            <img
              src={profilePicture}
              alt={username}
              className="rounded-circle card-profile-picture"
            />
          </div>
        </div>
        <div className="col">
          <div className="text-muted d-inline-block">{username}</div>
        </div>
      </div>
    </Link>
  );
};

export default UserTag;
