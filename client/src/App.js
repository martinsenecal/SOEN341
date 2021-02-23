// General Import
import React from 'react';
import './static/style/App.css';
import { makeStyles } from '@material-ui/core/styles';
import setAuthToken from './utils/setAuthToken';

// Components Import
import ChildApp from './ChildApp';

// Context (State) Import
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';

const useStyles = makeStyles({});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <AuthProvider>
        <PostProvider>
          <ChildApp />
        </PostProvider>
      </AuthProvider>
    </div>
  );
}
