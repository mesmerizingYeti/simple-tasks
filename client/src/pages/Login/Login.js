import React from 'react'
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import LoginForm from '../../components/LoginForm'
import GoogleSignInButton from '../../components/GoogleSignInButton'
import axios from 'axios'

const Login = () => {
  return (
    <div>
      <Typography variant="h3">Login Page</Typography>
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
      <LoginForm />
      <br />
      <Button 
        variant="contained" 
        onClick={() =>{
          console.log('Trying to sign in')
          axios.get('/auth/google')
        }}
      >
        Google Login
      </Button>
    </div>
  )
}

export default Login