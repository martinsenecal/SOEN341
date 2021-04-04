import React, {useContext, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import ImageCard from '../building-blocks/ImageCard';
import Spinner from '../building-blocks/Spinner';

// Import State
import {AuthContext} from '../../context/AuthContext';
import {PostContext} from '../../context/PostContext';

const Feed = () => {
  const [auth] = useContext(AuthContext);
  const [postData, setPostData] = useContext(PostContext);

  useEffect(() => {
    const getPosts = async () => {
      await fetchPosts();
    };
    getPosts();
  }, [auth.user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/feed/${auth.user._id}`);
      setPostData({
        ...postData,
        posts: res.data,
        loading: false,
      });
    } catch (err) {
      console.log('Error while fetching Posts');
    }
  };

  const renderFeed = () => {
    return (
      <>
        {postData.posts.length <= 0 ? (
          <div className="container">
            <div id="feed-no-post-display">
              <h5>You don't have any posts in your feed yet!</h5>
              <p>Get started by posting to your profile.</p>
              <p>
                <Link to="/postForm" className="btn btn-primary">
                  Post a photo
                </Link>
              </p>
              <p>
                You can also use the search bar to find and follow your friends.
              </p>
            </div>
          </div>
        ) : (
          <div className="container">
            <div id="feed-list" className="container w-50">
              <div className="row">
                {postData.posts.map((photo) => (
                  <ImageCard key={photo._id} photo={photo} />
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {auth.loading || auth.user === null || postData.loading ? (
        <Spinner />
      ) : (
        renderFeed()
      )}
    </>
  );
};

export default Feed;
