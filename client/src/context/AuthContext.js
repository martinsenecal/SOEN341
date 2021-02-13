import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

// How to Use it inside a component:
// import { AuthContext } from './AuthContext';
// const [auth, setAuth] = useContext(AuthContext);
