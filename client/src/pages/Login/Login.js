import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import LoginForm from '../../components/LoginForm'
import GoogleSignInButton from '../../components/GoogleSignInButton'
import axios from 'axios'

const Login = () => {
  const history = useHistory()

  return (
    <div>
      <Typography variant="h3">Sign In Page</Typography>
      {/*
        Sign in form
          Circle with lock icon
          Sign in
          Email Address* (TextField)
          Password* (TextField)
          Sign In (Button)
        Google Sign In
        Forgot password?    Don't have an account? Sign Up
      */}
      {/* <LoginForm /> */}
      <br />
      <Button 
        variant="contained" 
        onClick={() =>{
          history.push('/auth/google')
          history.go(0)
        }}
      >
        Google Sign In
      </Button>
      {null}
    </div>
  )
}

export default Login