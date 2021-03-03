import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

import UserTag from './UserTag';

const ImageCard = ({photo}) => {
  return (
    <div className="card image-card">
      <div className="card-header p-1 poster-info-display">
        <UserTag
          profilePicture={photo.profilePicture}
          username={photo.username}
        />
      </div>
      <div className="photo-container">
        <Link to={`/posts/${photo._id}`}>
          <img src={photo.postedPicture} alt={photo.date} />{' '}
        </Link>
      </div>
      <div className="card-body">
        <div className="card-text description-display">
          <p>{photo.description}</p>
        </div>

        <div className="card-text">
          <small className="text-muted">
            Posted <Moment format="YYYY/MM/DD">{photo.date}</Moment>{' '}
          </small>
        </div>
        <div className="card-text pb-1">
          <div className="like-count-display d-inline">
            <i className="fa fa-heart-o like-button"></i>
            {/*<LikeButton liked={photo.liked} />
            <small>{formatNumber(photo.likesNumber)}</small>{' '}*/}
          </div>

          <div className="comment-count-display d-inline">
            <Link to={`/posts/${photo._id}`}>
              <i className="fa fa-comment-o"></i>{' '}
              <small>
                {photo.comments.length ? photo.comments.length : '0'}
              </small>
            </Link>
          </div>
        </div>
        <div className="card-footer add-comment-display">
          <Link
            to={`/posts/${photo._id}`}
            className="btn btn-primary"
            style={{float: 'right', fontSize: '14px'}}
          >
            Leave a comment!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
