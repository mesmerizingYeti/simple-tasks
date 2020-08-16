import React from 'react'
import {
  Grid,
  Button
} from '@material-ui/core'
import GoogleLogin from 'react-google-login'

const responseGoogle = (response) => {
  console.log(response);
}

const GoogleSignInButton = () => {
  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid item xs={9}>
        <GoogleLogin
          clientId="536221883222-63tejokn6bru9vd7j6njj5hobjkqsf4i.apps.googleusercontent.com"
          render={renderProps => (
            <Button variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</Button>
          )}
          uxMode="redirect"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          redirectUri="http://localhost:3000"
        />
      </Grid>
    </Grid>
  )
}

export default GoogleSignInButton