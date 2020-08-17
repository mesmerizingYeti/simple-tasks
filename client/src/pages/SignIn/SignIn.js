import React from 'react'
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core'
import SignInForm from '../../components/SignInForm'
import GoogleSignInButton from '../../components/GoogleSignInButton'
import axios from 'axios'

const Login = () => {
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
      <SignInForm />
      <br />
      <Button 
        variant="contained" 
        onClick={() =>{
          console.log('Trying to sign in')
          axios.get('/auth/google')
        }}
      >
        Google Sign In
      </Button>
    </div>
  )
}

export default Login