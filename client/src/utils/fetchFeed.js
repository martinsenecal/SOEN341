import axios from 'axios';
const FetchPosts = async () => {
  try {
    const res = await axios.get('/api/feed');
    return res;
  } catch (error) {
    if (error === 'No posts') {
      return false;
    }
    if (error === 'Error while fetching') {
      return false;
    }
    return false;
  }
};

module.exports = FetchPosts;
