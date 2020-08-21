import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Typography,
  Button,
  Paper,
  Container
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GoogleButton from 'react-google-button'

import Logo from '../../components/Logo'
import LoginForm from '../../components/LoginForm'
import GoogleLoginButton from '../../components/GoogleLoginButton'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    WebkitTransform: 'translateX(-50%) translateY(-50%)',
    transform: 'translateX(-50%) translateY(-50%)',
    minHeight: '40%',
    minWidth: '40%',
  },
  title: {
    color: '#916953',
    marginBottom: '0.5rem'
  },
  logo: {
    width: '7rem',
    height: '7rem',
    borderRadius: '50%',
    WebkitBoxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    marginBottom: '0.5rem'
  },
  paper: {
    backgroundColor: '#B4B8AB',
    padding: '1rem'
  }
})

const Login = () => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Logo className={classes.logo} />
          {/* <Typography variant="h3" className={classes.title}>Simple Tasks</Typography> */}
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={8}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid container item xs={12} justify="center" alignItems="center">
                <GoogleLoginButton
                  onClick={() => {
                    history.push('/auth/google')
                    history.go(0)
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {/*
        Login form
          Circle with lock icon
          Login
          Email Address* (TextField)
          Password* (TextField)
          Login (Button)
        Google Login
        Forgot password?    Don't have an account? Sign Up
      */}
      {/* <LoginForm /> */}
    </div>
  )
}

export default Login