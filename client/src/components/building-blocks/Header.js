import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../../static/image/logo.png';
import axios from 'axios';

const Header = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [searchData, setSearchData] = useState([]);

  const editSearchTerm = async (e) => {
    console.log(e.target.value);
    if (e.target.value.length > 0) {
      try {
        const res = await axios.get('/api/users/search/' + e.target.value);
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
                      data-toggle="dropdown"
                      onChange={editSearchTerm}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-secondary">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                    <div
                      className={`${searchData.length === 0 ? 'hidden' : ''}`}
                    >
                      <div className="dropdown-menu">
                        {searchData.map((user) => (
                          <a
                            class="dropdown-item"
                            href={'/profile/' + user.username}
                            key={user.id}
                          >
                            <img
                              className="smallProfilePicture"
                              src={user.profilePicture}
                            ></img>
                            {user.username}
                          </a>
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
                    <Link className="dropdown-item" to="/profile">
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
