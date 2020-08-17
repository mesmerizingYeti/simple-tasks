import React, { useContext } from 'react'
import {
  Grid,
  Button
} from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import { useHistory } from 'react-router-dom'
import UserContext from '../../utils/UserContext'


const GoogleSignInButton = () => {
  let history = useHistory()
  const { handleCreateUser } = useContext(UserContext)
  
  const onSuccess = response => {
    console.log(response)
    let newUser = {
      email: response.profileObj.email,
      _id: response.googleId,
      jwt: response.tokenId,
      isGoogle: true
    }
    console.log(newUser)
    handleCreateUser(newUser)
    history.push('/')
  }

  const responseGoogle = authResult => {
    console.log(authResult)
  }

  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid item xs={9}>
        <GoogleLogin
          clientId="536221883222-63tejokn6bru9vd7j6njj5hobjkqsf4i.apps.googleusercontent.com"
          onSuccess={onSuccess}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          scope="profile"
        />
      </Grid>
    </Grid>
  )
}

export default GoogleSignInButton