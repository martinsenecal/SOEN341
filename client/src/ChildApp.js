// General Import
import React, {useEffect, useContext} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';

// Components Import
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Landing from './components/pages/Landing';
import Feed from './components/pages/Feed';
import Header from './components/building-blocks/Header';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import PhotoPage from './components/pages/PhotoPage';
import PostForm from './components/posts/PostForm';

// Context (State) Import
import {AuthContext} from './context/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const [auth] = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated && !auth.loading ? (
          <Redirect to="/signin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const ChildApp = () => {
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    const getLoadUser = async () => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/feed" component={Feed} />
        <PrivateRoute exact path="/profile/:username" component={Profile} />
        <PrivateRoute exact path="/editProfile/" component={EditProfile} />
        <PrivateRoute exact path="/posts/:id" component={PhotoPage} />
        <PrivateRoute exact path="/postForm" component={PostForm} />
      </Switch>
    </Router>
  );
};

export default ChildApp;
