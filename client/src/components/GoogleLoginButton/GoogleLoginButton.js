import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  Typography
} from '@material-ui/core'
import GoogleIcon from '../GoogleIcon'

const useStyles = makeStyles({
  button: {
    backgroundColor: "white"
  },
  icon: {
    height: "1.5rem",
    width: "1.5rem"
  }
})

const GoogleLoginButton = props => {
  const classes = useStyles()

  return (
    <Button
      className={classes.button}
      onClick={props.onClick}
      fullWidth
    >
      <Grid container justify="space-between" alignItems="center">
        <Grid container item xs={2} justify="center" alignItems="center">
          <GoogleIcon
            className={classes.icon}
          />
        </Grid>
        <Grid container item xs={9} justify="center" alignItems="center">
          <Typography variant="h6">Google Login</Typography>
        </Grid>
      </Grid>
    </Button>
  )
}

export default GoogleLoginButton