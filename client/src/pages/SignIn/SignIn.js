import React from 'react'
import {
  Grid,
  Typography
} from '@material-ui/core'
import SignInForm from '../../components/SignInForm'
import GoogleSignInButton from '../../components/GoogleSignInButton'

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
      <GoogleSignInButton />
    </div>
  )
}

export default Login