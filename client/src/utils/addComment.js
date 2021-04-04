import axios from 'axios';

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

    return res;
  } catch (err) {
    return false;
  }
};

module.exports = addComment;
