import React, {useContext, useEffect, useState} from 'react';
import Moment from 'react-moment';
import axios from 'axios';

import UserTag from '../building-blocks/UserTag';
import Spinner from '../building-blocks/Spinner';

import {PostContext} from '../../context/PostContext';

const PhotoPage = ({match}) => {
  const [postData, setPostData] = useContext(PostContext);
  const [text, setText] = useState(''); // Local State for Comment

  useEffect(() => {
    const getPost = async () => {
      const postFromServer = await fetchPost(match.params.id); // match is used for links
      setPostData({
        ...postData,
        post: postFromServer.data,
        loading: false,
      });
    };
    getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPost = async (id) => {
    try {
      console.log(id);
      const res = await axios.get(`/api/feed/posts/${id}`);
      return res;
    } catch (err) {
      console.log('Error while fetching Posts');
    }
  };

  const addComment = async (postId, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        `/api/feed/comment/${postId}`,
        formData,
        config
      );

      setPostData({
        ...postData,
        post: {
          ...postData.post,
          comments: res.data,
        },
        loading: false,
      });
    } catch (err) {
      setPostData({
        ...postData,
        loading: false,
      });
    }
  };

  return (
    <>
      {postData.loading || postData.post === null ? (
        <Spinner />
      ) : (
        <>
          {' '}
          <div className="mt-5">
            <div className="container" id="photo-box">
              <div className="row">
                <div className="col-6">
                  <div className="photo-container">
                    <img
                      src={postData.post.postedPicture}
                      alt={postData.post.date}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="info-display container pt-3">
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
                      <div className="like-count-display d-inline">
                        <i className="fa fa-heart-o like-button"></i>
                        {/*<LikeButton liked={photo.liked} />
                        <small>{formatNumber(photo.likesNumber)}</small>{' '}*/}
                      </div>

                      <div className="comment-count-display d-inline">
                        <i className="fa fa-comment-o"></i>{' '}
                        <small>
                          {postData.post.comments.length
                            ? postData.post.comments.length
                            : '0'}
                        </small>
                      </div>
                    </div>
                    <div
                      id="comment-list"
                      className={`border-top border-bottom overflow-auto ${
                        postData.post.comments.length ? '' : 'd-none'
                      }`}
                    >
                      <ul className="">
                        {postData.post.comments.map((comment, index) => (
                          <li key={index} className="">
                            <div className="comment">
                              <UserTag
                                key={comment._id}
                                profilePicture={comment.profilePicture}
                                username={comment.username}
                              />

                              <div className="comment-text">
                                {comment.text}
                                <br />
                                <small className="text-muted">
                                  Posted{' '}
                                  <Moment format="YYYY/MM/DD">
                                    {comment.date}
                                  </Moment>
                                </small>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`add-comment-display mx-3 ${
                      postData.post.comments.length
                        ? ''
                        : 'mt-3 pt-4 border-top'
                    }`}
                  >
                    <form
                      className="form-row align-items-center"
                      onSubmit={(e) => {
                        e.preventDefault();
                        addComment(postData.post._id, {text});
                        setText('');
                      }}
                    >
                      <div className="col">
                        <textarea
                          name="text"
                          className="form-control"
                          placeholder="Leave a comment :)"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-xs-auto">
                        <button type="submit" className="btn btn-link">
                          <i className="fa fa-send-o"></i> post
                        </button>
                      </div>
                    </form>
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
