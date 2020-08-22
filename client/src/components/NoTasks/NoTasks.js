import React from 'react'
import {
  Container,
  Paper,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  noTaskPaper: {
    backgroundColor: "#B4B8AB",
    textAlign: "center"
  }
})

const NoTasks = props => {
  const classes = useStyles()

  return (
    <Container>
      <Paper fullWidth className={classes.noTaskPaper}>
        <Typography variant="subtitle1">
          {props.page === 'home'
            ? "Please add a task."
            : "No archived tasks."
          }
        </Typography>
      </Paper>
    </Container>
  )
}

export default NoTasks