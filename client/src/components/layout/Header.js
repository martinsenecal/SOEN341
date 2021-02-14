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
        className="navbar navbar-expand-md navbar-dark "
        style={{
          paddingLeft: '30px',
        }}
      >
        <a className="navbar-brand" href="#!">
          <img
            src={logo}
            width="40"
            height="40"
            alt="logo"
            style={{ MarginLeft: '2rem' }}
          ></img>
        </a>
        <a
          className="navbar-brand"
          href="#!"
          style={{
            fontSize: '25px',
          }}
        >
          PhotoX
        </a>
        {auth.isAuthenticated && (
          <>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarCollapse"
            >
              <div className="navbar-nav">
                <form className="form-inline">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-secondary">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <Link className="nav-item nav-link active" to="/feed">
                  Feed
                </Link>
                <Link className="nav-item nav-link active" to="/">
                  New Post
                </Link>
                <div className="nav-item dropdown active">
                  <a
                    href="#!"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-user-circle-o fa-lg"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-sm-right">
                    <Link className="dropdown-item" to="/">
                      Profile
                    </Link>
                    <a onClick={logout} className="dropdown-item" href="#!">
                      <i className="fas fa-sign-out-alt"></i>
                      <span className="hide-sm">Logout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
