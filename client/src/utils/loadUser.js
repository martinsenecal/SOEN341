import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export default loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); //set header token if there is one
  }

  try {
    const res = await axios.get('/api/auth');
    setAuth({
      ...state,
      isAuthenticated: true,
      loading: false,
      user: res.data,
    });
  } catch (err) {
    localStorage.removeItem('token');
    setAuth({
      ...state,
      isAuthenticated: false,
      token: null,
      loading: false,
    });
  }
};
