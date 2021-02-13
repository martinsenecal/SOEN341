// General Import
import React from 'react';
import './static/style/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// Components Import
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';

// Context (State) Import
import { AuthProvider } from './context/AuthContext';

const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AuthProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signIn" component={SignIn} />
            <Route exact path="/signUp" component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}
