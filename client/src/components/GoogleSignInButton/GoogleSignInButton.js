import React from 'react'
import {
  Grid,
  Button
} from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'


const GoogleSignInButton = () => {
  let history = useHistory()
  
  const responseGoogle = authResult => {
    console.log(authResult)
  }
  
  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid item xs={9}>
        <GoogleLogin
          clientId="536221883222-63tejokn6bru9vd7j6njj5hobjkqsf4i.apps.googleusercontent.com"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope="profile email"
        />
      </Grid>
    </Grid>
  )
}

export default GoogleSignInButton