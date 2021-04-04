import axios from 'axios';

const fetchProfile = async (username) => {
  try {
    const resProfile = await axios.get(`/api/users/${username}`);
    const resPosts = await axios.get(`/api/users/posts/${username}`);
    const data = resProfile;

    return data;
  } catch (error) {
    if (error === 'Error') {
      console.log('Error while fetching Profile');
    }
    if (error === 'Invalid Profile') {
      console.log('No profile found');
    }
    return false;
  }
};

module.exports = fetchProfile;
