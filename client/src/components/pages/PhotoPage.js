import React, { useContext, useEffect } from 'react';
import Moment from 'react-moment';
import axios from 'axios';

import formatNumber from '../../utils/numberFormat';
import LikeButton from '../building-blocks/LikeButton';
import UserTag from '../building-blocks/UserTag';

import { PostContext } from '../../context/PostContext';

const PhotoPage = ({ match }) => {
  const [postData, setPostData] = useContext(PostContext);

  useEffect(() => {
    const getPosts = async () => {
      await fetchPost(match.params.id); // match is used for links
    };
    getPosts();
  }, [match.params.id]);

  const fetchPost = async (id) => {
    try {
      console.log(id);
      const res = await axios.get(`/api/feed/posts/${id}`);
      setPostData({
        ...postData,
        post: res.data,
        loading: false,
      });
    } catch (err) {
      console.log('Error while fetching Posts');
    }
  };

  return (
    <>
      {postData.loading || postData.post === null ? (
        <div>Loading...</div>
      ) : (
        <>
          {' '}
          <div className="container mt-5">
            <div className="container" id="photo-box">
              <div className="row">
                <div className="col-8">
                  <div className="photo-container">
                    <img
                      src={postData.post.postedPicture}
                      alt={postData.post.date}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="info-display pt-3">
                    <div>
                      <UserTag
                        profilePicture={postData.post.profilePicture}
                        username={postData.post.username}
                      />
                    </div>
                    <div className="description-display pt-2">
                      <p>{postData.post.description}</p>
                    </div>
                    <div>
                      <small className="text-muted">
                        Posted{' '}
                        <Moment format="YYYY/MM/DD">
                          {postData.post.date}
                        </Moment>{' '}
                      </small>
                    </div>
                    <div>
                      <i className="fa fa-heart-o"></i>
                      {/*<div className="like-count-display d-inline">
                  <LikeButton liked={photo.liked} />
                  <small>{formatNumber(photo.likesNumber)}</small>{' '}
                </div>*/}
                      <div className="comment-count-display d-inline">
                        <button
                          className="comment-button"
                          onClick={() => console.log('comment button clicked.')}
                        >
                          <i className="fa fa-comment-o"></i>
                        </button>
                        {/* <small>{formatNumber(photo.commentsNumber)}</small>*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 p-3">
                  <div className="add-comment-display">
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
                          <button
                            type="submit"
                            className="btn btn-primary mb-2"
                          >
                            <i className="fa fa-send-o"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div id="comment-list" className="card mt-2">
                    <ul className="list-group list-group-flush">
                      {postData.post.comments.map((comment) => (
                        <li key={comment._id} className="list-group-item p-0">
                          <div className="comment card-body">
                            <div className="row">
                              <div className="col-3 comment-commenter">
                                <UserTag
                                  key={comment._id}
                                  profilePicture={comment.profilePicture}
                                  username={comment.username}
                                />
                              </div>
                              <div className="col comment-text">
                                <p>{comment.text}</p>
                                <small className="text-muted">
                                  Posted {comment.date}
                                </small>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PhotoPage;
