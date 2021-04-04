import axios from 'axios';

const SignIn = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/auth', data, config);
    return true;
  } catch (error) {
    if (error === 'Invalid Credentials') {
      console.log('Invalid Credentials');
    }
    if (error === 'Invalid email') {
      console.log('Please include a valid email');
    }
    return false;
  }
};

module.exports = SignIn;
