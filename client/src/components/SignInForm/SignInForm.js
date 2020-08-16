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
      spacing={2}
      justify="center" 
      direction="column" 
      alignItems="center"
    >
      <Grid 
        item 
        container
        direction="row"
        alignItems="center" 
        xs={9}
      >
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
        />
      </Grid>
      <Grid 
        item 
        container
        direction="row"
        alignItems="center" 
        xs={9}
      >
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
        />
      </Grid>
      <Grid 
        item 
        container
        direction="row"
        alignItems="center" 
        xs={9}
      >
        <Button
          fullWidth
          color="primary"
          variant="contained"
        >
          Sign In
        </Button>
      </Grid>
    </Grid>
  )
}

export default SignInForm