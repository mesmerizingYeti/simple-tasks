import React from 'react'
import {
  Grid,
  TextField,
  Button
} from '@material-ui/core'

const LoginForm = () => {
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
          Login
        </Button>
      </Grid>
    </Grid>
  )
}

export default LoginForm