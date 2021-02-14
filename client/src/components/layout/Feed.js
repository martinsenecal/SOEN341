import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, Redirect } from 'react-router-dom';

const Feed = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const logout = async () => {
    console.log('ByeBye!');
    localStorage.removeItem('token');
    setAuth({
      ...auth,
      isAuthenticated: false,
      token: null,
      loading: false,
    });
  };
  return (
    <div>
      <h1>This is the feed! Wohoooo!</h1>
      {!auth.loading && (
        <>
          {' '}
          {auth.isAuthenticated ? (
            <>
              <div>
                <a onClick={logout} href="#!">
                  Log Out!!
                </a>
              </div>{' '}
            </>
          ) : (
            <>
              {' '}
              <Link to="/signin">
                Bring me to the Sign In Page. Por Favor
              </Link>{' '}
            </>
          )}{' '}
        </>
      )}
    </div>
  );
};

export default Feed;
