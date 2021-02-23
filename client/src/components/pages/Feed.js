import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ImageCard from '../building-blocks/ImageCard';

// Import State
import { AuthContext } from '../../context/AuthContext';
import { PostContext } from '../../context/PostContext';

const Feed = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [postData, setPostData] = useContext(PostContext);
  //PhotoData will be in reality posts.posts

  useEffect(() => {
    const getPosts = async () => {
      await fetchPosts();
      // setPosts(postsFromServer);
    };
    getPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/feed');
      setPostData({
        ...postData,
        posts: res.data,
        loading: false,
      });
    } catch (err) {
      console.log('Error while fetching Posts');
    }
  };

  return (
    <>
      {auth.loading ||
      auth.user === null ||
      postData.loading ||
      postData.posts === null ? (
        <div>Loading...</div>
      ) : (
        <>
          {' '}
          <h1>Welcome to the Feed {auth.user.username}!</h1>
          <div className="container">
            <div id="feed-list" className="container w-50">
              <div className="row">
                {postData.posts.map((photo) => (
                  <ImageCard key={photo._id} photo={photo} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Feed;
