import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

import Copyright from '../layout/Copyright';
import logo from '../../static/image/logo.png';
import HeaderInitial from '../layout/HeaderInitial';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Material UI styling
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://i0.wp.com/www.pixel4k.com/wp-content/uploads/2018/09/night-city-skyscrapers-road-light-traffic-wan-chai-hong-kong-4k_1538066026.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [auth, setAuth] = useContext(AuthContext);

  const onSubmit = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(data);
    try {
      const res = await axios.post('/api/auth', data, config);
      let token = res.data.token;
      console.log(token);
      // console.log(res.json());
      localStorage.setItem('token', token);
      setAuth({
        ...auth,
        // token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        // user: null,
      });
      await loadUser();
    } catch (error) {
      localStorage.removeItem('token');
      setAuth({
        ...auth,
        isAuthenticated: false,
        token: null,
        loading: false,
      });
      if (error.response) {
        console.log(error.response.data.errors[0].msg); // => the response payload
        if (error.response.data.errors[0].msg === 'Invalid Credentials') {
          setError(true);
        }
        if (
          error.response.data.errors[0].msg === 'Please include a valid email'
        ) {
          setErrorEmail(true);
        }
      }
    }
  };

  const loadUser = async () => {
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

  // Redirect if logged in
  if (auth.isAuthenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <div>
      <HeaderInitial />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar
              src={logo}
              style={{
                margin: '10px',
                width: '50px',
                height: '50px',
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register({
                  required: true,
                })}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <p className="validationError">Email Required</p>
              )}
              {errorEmail && (
                <p className="validationError">Invalid Email Address</p>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 6,
                  },
                })}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="validationError">
                  Password must be at least 6 characters long
                </p>
              )}
              {error && (
                <p className="validationError">Email or password is invalid.</p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/signup" variant="body2">
                    New to PhotoX? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
