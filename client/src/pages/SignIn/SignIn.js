import React from 'react'
import Typography from '@material-ui/core/Typography'
import SignInForm from '../../components/SignInForm'

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
    </div>
  )
}

export default Login