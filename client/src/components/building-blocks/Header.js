import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../../static/image/logo.png';
import axios from 'axios';

const Header = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => editSearchTerm(), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const editSearchTerm = async () => {
    if (query.length > 0) {
      try {
        const res = await axios.get('/api/users/search/' + query);
        setSearchData(res.data);
        console.log(res);
      } catch (err) {
        console.log('Error while fetching Users');
      }
    } else {
      setSearchData([]);
    }
  };

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
        className="navbar navbar-expand-md navbar-dark"
        style={{
          padding: '5px 26px 5px 30px',
        }}
      >
        <Link
          to="/feed"
          style={{
            marginRight: '12px',
          }}
        >
          <img src={logo} width="40" height="40" alt="logo"></img>
        </Link>
        <Link to="/feed">
          <div
            className="navbar-brand p-0"
            href="#!"
            style={{
              fontSize: '30px',
            }}
          >
            <span className="logo logo-photo logo-photo-on-drk">photo</span>
            <span className="logo logo-X">X</span>
          </div>
        </Link>
        {auth.isAuthenticated && auth.user !== null && (
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
                      data-toggle="dropdown"
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      className="form-control user-search-field"
                      placeholder="Search..."
                    />
                    <div className="input-group-append adjust-search-icon">
                      <i className="fa fa-search user-search-icon"></i>
                    </div>
                    <div
                      className={`${searchData.length === 0 ? 'hidden' : ''}`}
                    >
                      <div className="dropdown-menu">
                        {searchData.map((user) => (
                          <Link
                            className="dropdown-item"
                            key={user._id}
                            to={`/profile/${user.username}`}
                          >
                            <img
                              className="smallProfilePicture"
                              src={user.profilePicture}
                              alt="Profile"
                            ></img>
                            {user.username}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </form>
                <Link className="nav-item nav-link active" to="/feed">
                  Feed
                </Link>
                <Link className="nav-item nav-link active" to="/postform">
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
                    <Link
                      className="dropdown-item"
                      to={`/profile/${auth.user.username}`}
                    >
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
