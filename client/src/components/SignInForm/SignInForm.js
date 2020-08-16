import React from 'react'
import {
  Grid,
  Typography,
  TextField,
  Button
} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  grid: {
    display: 'flex'
  }
})

const SignInForm = () => {
  const classes = useStyles()

  return (
    <Grid 
      container
      justify="center" 
      direction="column" 
      alignItems="center"
    >
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}

export default SignInForm