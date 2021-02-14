// General Import
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';

// Components Import
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';

// Context (State) Import
import { AuthContext } from './context/AuthContext';

const ChildApp = () => {
  const [auth, setAuth] = useContext(AuthContext);
  useEffect(() => {
    // Content of LoadUser();
    const getLoadUser = async () => {
      // await loadUser();
      if (localStorage.token) {
        setAuthToken(localStorage.token); //set header token if there is one
      }

      try {
        const res = await axios.get('/api/auth');
        setAuth({
          ...auth,
          isAuthenticated: true,
          loading: false,
          user: res.data,
        });
      } catch (err) {
        localStorage.removeItem('token');
        setAuth({
          ...auth,
          isAuthenticated: false,
          token: null,
          loading: false,
        });
      }
    };
    getLoadUser();
  }, []); //[] is similar to component did mount. updated once

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default ChildApp;
