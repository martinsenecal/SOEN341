import React from 'react';
import logo from '../../static/image/logo.png';

function HeaderInitial() {
  return (
    <nav>
      <ul class="nav pl-4 ">
        <a class="navbar-brand " href="/">
          <img src={logo} width="40" height="40" alt="logo"></img>
        </a>
        <a
          class="navbar-brand"
          href="/"
          style={{
            marginTop: '0.15em',
            fontSize: '23px',
          }}
        >
          PhotoX
        </a>
      </ul>
    </nav>
  );
}

export default HeaderInitial;
