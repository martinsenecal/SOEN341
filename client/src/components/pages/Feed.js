import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import ImageCard from '../building-blocks/ImageCard';
import Spinner from '../building-blocks/Spinner';

// Import State
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';

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
            <h2>Oops!</h2>
            <h3>No post found...</h3>
            <Spinner />
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
