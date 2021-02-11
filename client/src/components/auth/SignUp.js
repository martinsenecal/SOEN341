import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Copyright from '../layout/Copyright';
import logo from '../../static/image/logo.png';

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

  //react form
  const { register, handleSubmit, errors } = useForm();

  //send user data to back end
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post('http://localhost:5000/api/users', data)
      .then((res) => console.log(res.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.errors[0].msg); // => the response payload
          if (error.response.data.errors[0].msg === 'User already exists') {
            alert('User already exist. Username or email already used.'); //TODO make "Email or Password is invalid" print
          }
        }
      });
  };

  return (
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
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
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
              <Link to="/SignIn" variant="body2">
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
  );
};
export default SignUp;
