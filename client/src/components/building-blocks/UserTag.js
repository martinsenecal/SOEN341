import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import FollowButton from './FollowButton';

import { AuthContext } from '../../context/AuthContext';

const UserTag = ({ userId, username, profilePicture }) => {
  const [auth] = useContext(AuthContext);
  return (
    <div className="row align-items-center">
      <div className="col-auto">
        <Link to={'/profile/' + username} target="_parent">
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
      </div>
      <div className="col">
        {
          //visiting user to be switched to auth.user in condition, removed from follow button
          username === auth.user.username ? (
            ''
          ) : (
            <FollowButton extraClass="btn-sm py-0" userId={userId} />
          )
        }
      </div>
    </div>
  );
};

export default UserTag;
