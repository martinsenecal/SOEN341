// General Import
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';

// Component Import
import Copyright from '../layout/Copyright';
import logo from '../../static/image/logo.png';

// Material UI Import
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//MaterialUi styling
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [errorExists, setErrorExists] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  // react form
  const { register, handleSubmit, errors } = useForm();

  // send user data to back end
  const onSubmit = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(data);
    try {
      const res = await axios.post('/api/users', data, config);
      let token = res.data.token;
      console.log(token);
      // console.log(res.json());
      localStorage.setItem('token', token);
      setAuth({
        ...auth,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false,
        user: null,
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
        if (error.response.data.errors[0].msg === 'User already exists') {
          setErrorExists(true);
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
    <div className="register">
      <Container component="main" maxWidth="xs">
        <CssBaseline />

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
            Sign Up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  inputRef={register({
                    required: true,
                  })}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              {errors.name && <p className="validationError">Name Required</p>}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register({
                    required: true,
                  })}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              {errors.username && (
                <p className="validationError">Username Required</p>
              )}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register({
                    required: true,
                  })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              {errors.email && (
                <p className="validationError">Email Required</p>
              )}
              {errorEmail && (
                <p className="validationError">Invalid Email Address</p>
              )}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              {errors.password && (
                <p className="validationError">
                  Password must be at least 6 characters long
                </p>
              )}
              {errorExists && (
                <p className="validationError">
                  User already exist. Username or email already used.
                </p>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};
export default SignUp;
