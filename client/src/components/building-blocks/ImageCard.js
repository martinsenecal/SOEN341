import React from 'react';
//Import components
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import formatNumber from '../../utils/numberFormat';
import UserTag from './UserTag';

const ImageCard = ({ photo }) => {
  return (
    <div className="card image-card">
      <div className="card-header p-1 poster-info-display">
        <UserTag
          profilePicture={photo.profilePicture}
          username={photo.username}
        />
      </div>
      <div className="photo-container">
        <Link to={'/photo/' + photo._id}>
          <img src={photo.postedPicture} alt={photo.date} />{' '}
        </Link>
      </div>
      <div className="card-body">
        <div className="card-text description-display">
          <p>{photo.description}</p>
        </div>
        <div className="card-text">
          <small className="text-muted">Posted {photo.date} </small>
        </div>
        <div className="card-text">
          {/* <div className="like-count-display d-inline">
            <LikeButton liked={photo.liked} />
            <small>{formatNumber(photo.likesNumber)}</small>{' '}
          </div> */}
          <div className="comment-count-display d-inline">
            <button
              className="comment-button"
              onClick={() => console.log('comment button clicked.')}
            >
              <i className="fa fa-comment-o"></i>
            </button>
            {/* <small>{formatNumber(photo.commentsNumber)}</small> */}
          </div>
        </div>
      </div>
      <div className="card-footer add-comment-display">
        <form>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Leave a comment :) "
              />
            </div>
            <div className="col-xs-auto">
              <button type="submit" className="btn btn-primary mb-2">
                <i className="fa fa-send-o"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageCard;
