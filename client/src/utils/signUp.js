import axios from 'axios';

const SignUp = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/users', data, config);
    return true;
  } catch (error) {
    if (error === 'User already exists') {
      return false;
    }

    if (error === 'Invalid email') {
      return false;
    }
    return false;
  }
};

module.exports = SignUp;
