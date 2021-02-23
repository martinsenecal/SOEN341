import React, { useState, createContext } from 'react';

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [postData, setPostData] = useState({
    posts: [],
    post: null,
    loading: true,
  });

  return (
    <PostContext.Provider value={[postData, setPostData]}>
      {props.children}
    </PostContext.Provider>
  );
};
