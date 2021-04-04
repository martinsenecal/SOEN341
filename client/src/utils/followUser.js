import axios from 'axios';

const followUser = async (id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/users/follow/${id}`, config);
    return true;
  } catch (error) {
    if (error === 'Already following this user') {
      return false;
    }

    if (error === 'Invalid ID') {
      return false;
    }
    return false;
  }
};

module.exports = followUser;
