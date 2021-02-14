import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../../static/image/logo.png';

const Header = () => {
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
      <nav
        class="navbar navbar-expand-md navbar-dark "
        style={{
          paddingLeft: '30px',
        }}
      >
        <a class="navbar-brand" href="/">
          <img
            src={logo}
            width="40"
            height="40"
            alt="logo"
            style={{ MarginLeft: '2rem' }}
          ></img>
        </a>
        <a
          class="navbar-brand"
          href="/"
          style={{
            fontSize: '25px',
          }}
        >
          PhotoX
        </a>
        <button
          type="button"
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarCollapse"
        >
          <div class="navbar-nav">
            <form class="form-inline">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                />
                <div class="input-group-append">
                  <button type="button" class="btn btn-secondary">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <a href="/" class="nav-item nav-link active">
              <Link to="/feed">Feed</Link>
            </a>
            <a href="/" class="nav-item nav-link active">
              New Post
            </a>
            <div class="nav-item dropdown active">
              <a
                href="/"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                <i class="fa fa-user-circle-o fa-lg"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-sm-right">
                <a href="/" class="dropdown-item">
                  Profile
                </a>

                {!auth.loading && (
                  <>
                    {' '}
                    {auth.isAuthenticated ? (
                      <>
                        <div>
                          <a onClick={logout} class="dropdown-item" href="#!">
                            Log Out
                          </a>
                        </div>{' '}
                      </>
                    ) : (
                      <>
                        {' '}
                        <Link to="/signin">
                          Bring me to the Sign In Page.
                        </Link>{' '}
                      </>
                    )}{' '}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
